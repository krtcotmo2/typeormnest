import { Module } from '@nestjs/common';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charstats } from './stat.entity';
import { CharacterService } from 'src/character/character.service';
import { Characters } from 'src/character/characters.entity';
import { SavesService } from 'src/saves/saves.service';
import { SkillService } from 'src/skill/skill.service';
import { Charlevels } from 'src/levels/levels.entity';
import { LevelsService } from 'src/levels/levels.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Charstats, Characters, Charlevels]),
  ],
  providers: [StatService, CharacterService, SavesService, SkillService, LevelsService],
  controllers: [StatController]
})
export class StatModule {}
