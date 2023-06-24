import { Module } from '@nestjs/common';
import { SavesService } from './saves.service';
import { SavesController } from './saves.controller';
import { CharacterService } from 'src/character/character.service';
import { Characters } from 'src/character/characters.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charsaves } from './saves.entity';
import { StatService } from 'src/stat/stat.service';
import { SkillService } from 'src/skill/skill.service';
import { Charlevels } from 'src/levels/levels.entity';
import { LevelsService } from 'src/levels/levels.service';
import { CharClassesService } from 'src/char-classes/char-classes.service';
import { CharClassesDTO } from 'src/char-classes/dto/char-classes-dto';
@Module({
  imports:[
    TypeOrmModule.forFeature([
      Charsaves, 
      Characters, 
      Charlevels, 
      CharClassesDTO
    ]),
  ],
  providers: [SavesService, CharacterService, StatService, SkillService, LevelsService,CharClassesService],
  controllers: [SavesController]
})
export class SavesModule {}
