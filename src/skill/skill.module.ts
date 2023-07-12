import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Characters } from 'src/character/characters.entity';
import { Charskills } from './skills.entity';
import { Skills } from './defaultSkills.entity';
import { CharacterService } from 'src/character/character.service';
import { StatService } from 'src/stat/stat.service';
import { SavesService } from 'src/saves/saves.service';
import { LevelsService } from 'src/levels/levels.service';
import { CharClassesService } from 'src/char-classes/char-classes.service';
import { ToHitService } from 'src/to-hit/to-hit.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Characters]),
  ],
  providers: [SkillService, StatService, SavesService, LevelsService, CharClassesService, ToHitService, CharacterService],
  controllers: [SkillController]
})
export class SkillModule {}
