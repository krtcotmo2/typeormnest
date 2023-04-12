import { Module } from '@nestjs/common';
import { SavesService } from './saves.service';
import { SavesController } from './saves.controller';
import { CharacterService } from 'src/character/character.service';
import { Characters } from 'src/character/characters.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charsaves } from './saves.entity';
import { StatService } from 'src/stat/stat.service';
import { SkillService } from 'src/skill/skill.service';
@Module({
  imports:[
    TypeOrmModule.forFeature([Charsaves, Characters]),
  ],
  providers: [SavesService, CharacterService, StatService, SkillService],
  controllers: [SavesController]
})
export class SavesModule {}
