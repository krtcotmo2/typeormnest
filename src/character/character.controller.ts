import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { baseChar, CharactersDto, CharWithStats, SaveCharactersDto, UpdateCharactersDto } from './dto/character-dto';
import { map, Observable } from 'rxjs';
import { Characters } from './characters.entity';
import { StatService } from 'src/stat/stat.service';
import { SaveStatDto } from 'src/stat/dto/stat-dto';

@Controller('/api/character')
   // can also be applied to each route
export class CharacterController {
  constructor(
    private characterService: CharacterService,
    private statService: StatService  
  ){}
  
  @Get('/env')
  getEnv(){
    return this.characterService.getEnv();
  }
  
  @Get('/with-stats/:id')
  @Serialize(CharWithStats) 
  getCharacterWithStats(@Param('id') id: string): Observable<CharWithStats>{
    return this.characterService.getCharacterWithStats(id);
  }

  @Get('/with-calc-stats/:id')
  //@Serialize(CharWithStats) 
  getCharacterWithCalcStats(@Param('id') id: string): Observable<CharWithStats>{
    return this.characterService.getCharacterWithCalcStats(id);
  }

  @Get('/with-levels')
  getCharactersWithLevels(): Observable<Characters[]>{
    return this.characterService.getCharactersWithLevels();
  }

  @Get('/:id')
  @Serialize(baseChar) 
  getCharacter(@Param('id') id: string): Observable<Characters>{
    return this.characterService.getCharacter(id);

  }

  @Get('')
  getCharacters(): Observable<Characters[]>{
    return this.characterService.getCharacters();
  }



  @Post('/create')
  @Serialize(Characters)
  createCharacter(@Body() character: SaveCharactersDto){
    return this.characterService.createCharacter(character)
      .then((arg: baseChar) => {
        const statArray = [1,2,3,4,5,6];
        statArray.forEach(stat => {
          const s: SaveStatDto = {
            charID: arg.charID,
            statID: stat,
            score: 10,
            isBase: true,
            isMod: false,
            modDesc: 'Base'
          };
          this.statService.createStatLine(s); 
        });
        return JSON.stringify(arg)
      }
    );
  }

  @Put('/:id')
  @Serialize(Characters)
  updateCharacter(@Body() character: UpdateCharactersDto, @Param('id') id: string){
    return this.characterService.updateCharacter(character, +id).pipe(
      map( arg => JSON.stringify(arg)),
    );
  }
}

