import { Module } from '@nestjs/common';
import { Report } from './report.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportController],
  providers: [
    ReportService,
    //UserService
  ]
})
export class ReportModule { }
