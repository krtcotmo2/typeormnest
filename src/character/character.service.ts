import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { forkJoin, from, map, Observable, of, switchMap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { buildCharSaves } from 'src/saves/business-logic/saves-helper';
import { Charsaves } from 'src/saves/saves.entity';
import { buildCharStats } from 'src/stat/business-logic/stat-helper';
import { Charstats } from 'src/stat/stat.entity';
import { Repository } from 'typeorm';
import { Characters } from './characters.entity';
import { CharWithStats, SaveCharactersDto, UpdateCharactersDto } from './dto/character-dto';


@Injectable()
export class CharacterService {
  constructor( 
    @InjectRepository(Characters) private repo: Repository<Characters>,
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

  getEnv(){
    return {
      mode: process.env.NODE_ENV,
      user: process.env.socketURL
    };
  }

  getCharacterWithStats(id:string): Observable<CharWithStats> {
    const char =  from(AppDataSource.manager.findOneBy(Characters, {charID: +id}));
    const stats =  from(AppDataSource.manager.findBy(Charstats, {charID: +id}));
    const saves =  from(AppDataSource.manager.findBy(Charsaves, {charID: +id}));
    return forkJoin([char, stats, saves]).pipe( 
      switchMap( ([char, stats, saves]) => {
        if(!char){
          throw new NotFoundException("Character Not Found");
        }
        const hybrid: CharWithStats = {
          ...char,
          stats: buildCharStats(stats),
          saves: buildCharSaves(saves),
        }
        return of(hybrid);
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
