import { Module } from '@nestjs/common';
import { ExpendableController } from './expendable.controller';
import { ExpendableService } from './expendable.service';

@Module({
  controllers: [ExpendableController],
  providers: [ExpendableService]
})
export class ExpendableModule {}
