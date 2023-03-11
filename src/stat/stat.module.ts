import { Module } from '@nestjs/common';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charstats } from './stat.entity';
import { CharacterService } from 'src/character/character.service';
import { Characters } from 'src/character/characters.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Charstats, Characters]),
  ],
  providers: [StatService, CharacterService],
  controllers: [StatController]
})
export class StatModule {}
