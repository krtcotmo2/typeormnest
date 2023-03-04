import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { NotFoundError } from 'rxjs';
// import { AppDataSource } from 'src/app-data-source';
import { Repository } from 'typeorm';
import { Characters } from './characters.entity';


@Injectable()
export class CharacterService {
  constructor( @InjectRepository(Characters) private repo: Repository<Characters>){}
  // ds = AppDataSource.initialize();

  async getCharacter(id:string) {
    // const char =  await AppDataSource.manager.findOneBy(Characters, {charID: +id});
    // if(!char){
    //   throw new NotFoundException("Character Not Found");
    // }
    return 'A character';
  }
  getEnv(){
    return {
      mode: process.env.NODE_ENV,
      user: process.env.socketURL
    };
  }
}
