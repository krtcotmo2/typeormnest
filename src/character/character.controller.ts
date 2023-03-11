import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { baseChar, CharWithStats, SaveCharactersDto, UpdateCharactersDto } from './dto/character-dto';
import { map, Observable } from 'rxjs';
import { Characters } from './characters.entity';

@Controller('/api/character')
   // can also be applied to each route
export class CharacterController {
  constructor(private characterService: CharacterService){}
  
  @Get('/env')
  getEnv(){
    return this.characterService.getEnv();
  }
  
  @Get('/with-stats/:id')
  @Serialize(CharWithStats) 
  getCharacterWithStats(@Param('id') id: string): Observable<CharWithStats>{
    return this.characterService.getCharacterWithStats(id);
  }

  @Get('/:id')
  @Serialize(baseChar) 
  getCharacter(@Param('id') id: string){
    return this.characterService.getCharacter(id);
  }

  @Post('/create')
  @Serialize(Characters)
  createCharacter(@Body() character: SaveCharactersDto){
    return this.characterService.createCharacter(character).pipe(
      map( arg => {
        console.log(arg);
      })
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

