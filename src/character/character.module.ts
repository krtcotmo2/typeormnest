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
import { CharClassesService } from 'src/char-classes/char-classes.service';
import { CharClassesDTO } from 'src/char-classes/dto/char-classes-dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Characters, Charstats, Charsaves, Charlevels, CharClassesDTO])
  ],
  providers: [CharacterService, StatService, SavesService, SkillService, LevelsService, CharClassesService],
  controllers: [CharacterController]
})
export class CharacterModule {}
