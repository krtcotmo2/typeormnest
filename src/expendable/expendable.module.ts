import { Module } from '@nestjs/common';
import { ExpendableController } from './expendable.controller';
import { ExpendableService } from './expendable.service';
import { CharacterService } from 'src/character/character.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Characters } from 'src/character/characters.entity';
import { StatService } from 'src/stat/stat.service';
import { SavesService } from 'src/saves/saves.service';
import { SkillService } from 'src/skill/skill.service';
import { LevelsService } from 'src/levels/levels.service';
import { CharClassesService } from 'src/char-classes/char-classes.service';
import { ToHitService } from 'src/to-hit/to-hit.service';

@Module({
  controllers: [ExpendableController],
  providers: [
    ExpendableService,
  ]
})
export class ExpendableModule {}
