import { Module } from '@nestjs/common';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charstats } from './stat.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Charstats]),
  ],
  providers: [StatService],
  controllers: [StatController]
})
export class StatModule {}
