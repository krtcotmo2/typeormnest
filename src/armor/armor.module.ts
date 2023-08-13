import { Module } from '@nestjs/common';
import { ArmorService } from './armor.service';
import { ArmorController } from './armor.controller';
import { CharacterService } from 'src/character/character.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Characters } from 'src/character/characters.entity';
import { StatService } from 'src/stat/stat.service';
import { CharClassesService } from 'src/char-classes/char-classes.service';
import { LevelsService } from 'src/levels/levels.service';
import { SavesService } from 'src/saves/saves.service';
import { ToHitService } from 'src/to-hit/to-hit.service';
import { SkillService } from 'src/skill/skill.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Characters]),
  ],
  providers: [ArmorService, CharacterService, SkillService, StatService, SavesService, LevelsService, CharClassesService, ToHitService],
  controllers: [ArmorController]
})
export class ArmorModule {}
