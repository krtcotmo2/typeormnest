import { Module } from '@nestjs/common';
import { SavesService } from './saves.service';
import { SavesController } from './saves.controller';
import { CharacterService } from 'src/character/character.service';
import { Characters } from 'src/character/characters.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charsaves } from './saves.entity';
import { StatService } from 'src/stat/stat.service';
@Module({
  imports:[
    TypeOrmModule.forFeature([Charsaves, Characters]),
  ],
  providers: [SavesService, CharacterService, StatService],
  controllers: [SavesController]
})
export class SavesModule {}
