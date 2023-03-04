import { Controller, Get, Param } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { baseChar } from './dto/character-dto';

@Controller('/api/character')
@Serialize(baseChar)    // can also be applied to each route
export class CharacterController {
  constructor(private characterService: CharacterService){}
  
  @Get('/env')
  getEnv(){
    return this.characterService.getEnv();
  }
  
  @Get('/:id')
  getCharacter(@Param('id') id: string){
    return this.characterService.getCharacter(id);
  }
}

