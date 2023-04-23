import { Module } from '@nestjs/common';
import { CharClassesService } from './char-classes.service';
import { CharClassesController } from './char-classes.controller';

@Module({
  providers: [CharClassesService],
  controllers: [CharClassesController]
})
export class CharClassesModule {}
