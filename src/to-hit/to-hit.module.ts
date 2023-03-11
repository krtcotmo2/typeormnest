import { Module } from '@nestjs/common';
import { ToHitService } from './to-hit.service';
import { ToHitController } from './to-hit.controller';

@Module({
  providers: [ToHitService],
  controllers: [ToHitController]
})
export class ToHitModule {}
