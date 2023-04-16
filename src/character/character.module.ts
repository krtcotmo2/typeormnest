import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Characters } from './characters.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charstats } from 'src/stat/stat.entity';
import { StatService } from 'src/stat/stat.service';
import { Charsaves } from 'src/saves/saves.entity';
import { SavesService } from 'src/saves/saves.service';
import { SkillService } from 'src/skill/skill.service';
import { LevelsService } from 'src/levels/levels.service';
import { Charlevels } from 'src/levels/levels.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Characters, Charstats, Charsaves, Charlevels])
  ],
  providers: [CharacterService, StatService, SavesService, SkillService, LevelsService],
  controllers: [CharacterController]
})
export class CharacterModule {}
