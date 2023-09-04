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
import { CharClassesDTO } from 'src/char-classes/dto/char-classes-dto';
import { CharClassesService } from 'src/char-classes/char-classes.service';
import { ToHitService } from 'src/to-hit/to-hit.service';
import { ArmorService } from 'src/armor/armor.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Charstats,
      Characters,
      Charlevels,
      CharClassesDTO,
    ]),
  ],
  providers: [
    StatService,
    CharacterService,
    SavesService,
    SkillService,
    LevelsService,
    CharClassesService,
    ToHitService,
    ArmorService,
  ],
  controllers: [StatController],
})
export class StatModule {}
