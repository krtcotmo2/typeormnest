import { Module } from '@nestjs/common';
import { SpellsController } from './spells.controller';
import { SpellsService } from './spells.service';

@Module({
  controllers: [SpellsController],
  providers: [SpellsService]
})
export class SpellsModule {}
