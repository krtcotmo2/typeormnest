import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from 'src/app-data-source';
import { Repository } from 'typeorm';
import { Characters } from './characters.entity';


@Injectable()
export class CharacterService {
  constructor( @InjectRepository(Characters) private repo: Repository<Characters>){}

  async getCharacter(id:string) {
    const char =  await AppDataSource.manager.findOneBy(Characters, {charID: +id});
    if(!char){
      throw new NotFoundException("Character Not Found");
    }
    return char;
  }
  getEnv(){
    return {
      mode: process.env.NODE_ENV,
      user: process.env.socketURL
    };
  }
}
