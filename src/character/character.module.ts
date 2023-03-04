import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Characters } from './characters.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Characters])
  ],
  providers: [CharacterService],
  controllers: [CharacterController]
})
export class CharacterModule {}
