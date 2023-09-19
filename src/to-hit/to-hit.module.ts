import { Module } from '@nestjs/common';
import { ToHitService } from './to-hit.service';
import { ToHitController } from './to-hit.controller';
import { CharacterService } from 'src/character/character.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Characters } from 'src/character/characters.entity';
import { StatService } from 'src/stat/stat.service';
import { CharClassesService } from 'src/char-classes/char-classes.service';
import { LevelsService } from 'src/levels/levels.service';
import { SavesService } from 'src/saves/saves.service';
import { SkillService } from 'src/skill/skill.service';
import { ArmorService } from 'src/armor/armor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Characters])],
  providers: [
    ToHitService,
    StatService,
    SavesService,
    SkillService,
    LevelsService,
    CharClassesService,
    ToHitService,
    CharacterService,
    ArmorService,
  ],
  controllers: [ToHitController],
})
export class ToHitModule {}
