import { Module } from '@nestjs/common';
import { FeatController } from './feat.controller';
import { FeatService } from './feat.service';

@Module({
  controllers: [FeatController],
  providers: [FeatService]
})
export class FeatModule {}
