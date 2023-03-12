import { Module } from '@nestjs/common';
import { ArmorService } from './armor.service';
import { ArmorController } from './armor.controller';

@Module({
  providers: [ArmorService],
  controllers: [ArmorController]
})
export class ArmorModule {}
