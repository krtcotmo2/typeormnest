import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Characters } from './characters.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charstats } from 'src/stat/stat.entity';
import { StatService } from 'src/stat/stat.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Characters, Charstats])
  ],
  providers: [CharacterService, StatService],
  controllers: [CharacterController]
})
export class CharacterModule {}
