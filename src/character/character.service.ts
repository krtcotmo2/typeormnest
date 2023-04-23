import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, forkJoin, from, map, Observable, of, switchMap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Alignment } from 'src/enum/alignments';
import { Races } from 'src/enum/races';
import { calcSaves } from 'src/saves/business-logic/saves-helper';
import { SavesService } from 'src/saves/saves.service';
import { buildCharStats } from 'src/stat/business-logic/stat-helper';
import { StatService } from 'src/stat/stat.service';
import { Repository } from 'typeorm';
import { Characters } from './characters.entity';
import { CharWithStats, SaveCharactersDto, UpdateCharactersDto } from './dto/character-dto';
import { SkillService } from 'src/skill/skill.service';
import { LevelsService } from 'src/levels/levels.service';
import { CharClassesService } from 'src/char-classes/char-classes.service';
import {calcSavesAndHitsForEachClass } from 'src/char-classes/transformers/transform-char-class-data';
import { DefinedSaves } from 'src/saves/dto/saves-dto';


@Injectable()
export class CharacterService {
  constructor( 
    @InjectRepository(Characters) 
    private repo: Repository<Characters>,
    private statService: StatService,
    private saveService: SavesService,
    private skillService: SkillService, 
    private levelsService: LevelsService,
    private charClassService: CharClassesService,
  ){}

  getCharacter(id:string): Observable<Characters> {
    return from(AppDataSource.manager.findOneBy(Characters, {charID: +id})).pipe( 
      map( (char) =>{
        if(!char){
          throw new NotFoundException("Character Not Found");
        }
        return char;
      })
    );
  }

  getCharacters(): Observable<Characters[]> {
    return from(AppDataSource.manager.find(Characters, {
      order: {
        isDead: 'ASC',
        charName: 'ASC',
      }
    })).pipe(
      map( (chars) => chars)
    )
  }

  getCharactersWithLevels(): Observable<Characters[]> {
    const chars =  this.getCharacters();
    const lvls = this.levelsService.getAllCharLevels()
    return forkJoin([chars, lvls]).pipe( 
      switchMap( ([chars, lvls]) => {
        const nChars:Characters[] = chars.map( char => {
            return {
              ...char,
              levels: lvls.filter(lvl => lvl.charID === char.charID)
            }
          })
        return of(nChars);
      })
    );
  }

  getEnv(){
    return {
      mode: process.env.NODE_ENV,
      user: process.env.socketURL
    };
  }

  getCharacterWithStats(id:string): Observable<CharWithStats> {
    const char =  this.getCharacter(id);
    const stats =  this.statService.getCharStats(id);
    const saves =  this.saveService.getCharSaves(+id);
    const skills = this.skillService.getCharSkills(id);
    return forkJoin([char, stats, saves, skills]).pipe( 
      catchError(err => {
        console.log(err)
       throw err;
      }),
      switchMap( ([char, stats, saves, skills]) => {
        if(!char){
          throw new NotFoundException("Character Not Found");
        }
        const hybrid: CharWithStats = {
          ...char,
          race: Races[char.raceID],
          alignment: Alignment[char.alignID],
          stats: buildCharStats(stats),
          saves: new DefinedSaves(),
          skills: skills,
        }
        return of(hybrid);
      }), 
      
    );
  }

  getCharacterWithCalcStats(id:string): Observable<CharWithStats> {
    const char =  this.getCharacter(id);
    const stats =  this.statService.getCharStats(id);
    const saves =  this.saveService.getCharSaves(+id);
    const skills = this.skillService.getCharSkills(id);
    const levels = this.levelsService.getCharLevels(id);
    let charClassIds, charLevels

    return levels.pipe(
      switchMap((retrievedLevels) => {
        charClassIds = retrievedLevels.map(lvl => lvl.classID.toString());
        charLevels = retrievedLevels.map(lvl => lvl.classLevel.toString());
        return this.charClassService.getClassesForLimited(charClassIds);
      }),
      switchMap((classStats) => {
        return forkJoin([char, stats, saves, skills]).pipe( 
          catchError(err => {
            console.log(err)
           throw err;
          }),
          switchMap( ([char, stats, saves, skills]) => {
            if(!char){
              throw new NotFoundException("Character Not Found");
            }
            const transformedLevels = calcSavesAndHitsForEachClass(classStats , charClassIds, charLevels);
            const charStats = buildCharStats(stats);
            const charSaves = calcSaves(transformedLevels, charStats, saves);
            
            const hybrid = {
              ...char,
              race: Races[char.raceID],
              alignment: Alignment[char.alignID],
              stats: charStats,
              saves: charSaves,
              skills: skills,
              levels: transformedLevels.map(lvl => {
                return {
                  class: lvl.class,
                  level: lvl.level,
                  toHit: lvl.toHit
                }
              }),
            }
            return of(hybrid);
          }), 
          
        );
      })
    );
  }

  createCharacter(character: SaveCharactersDto): Observable<Characters> {
    const a = AppDataSource.manager.create(Characters, character);
    return from(AppDataSource.manager.save(Characters, {
      ...a,
      image: a.image ?? 'default.png',
      updatedAt: new Date(),
      createdAt: new Date(),
    }));
  }

  updateCharacter(char: UpdateCharactersDto, id: number): Observable<any>{
    return from(AppDataSource.manager.update(
      Characters,
      {charID: id},
      {
        ...char, 
        updatedAt: new Date()
      }
    )).pipe(
      switchMap( () => {
        return this.getCharacterWithStats(id.toString());
      })
    );

  }

}
