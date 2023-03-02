import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Session, 
  Patch,
  UseGuards,
  Query
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproverReportDto, CreateReportDto, EstimateDto, ReportDto } from './dto/report-dtos';
import { ReportService } from './report.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('api/report')
export class ReportController {
  constructor(
    private reportService: ReportService,
  ){}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async create(@Body() body: CreateReportDto, @CurrentUser() user: User){
    const report = this.reportService.create(body, user).catch( err => {
      throw err;
    })
    return report;
  }

  @Get('/estimate')
  @UseGuards(AuthGuard)
  async getEstimate(@Query() query:EstimateDto ){
    // return this.reportService.getEstimate(query);
    return this.reportService.useQueryBuilder(query); 
  }

  @Get()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async findAll(){
    return this.reportService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getAReport(@Param('id') id: string){
    return this.reportService.findOne(+id);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async approveReport(@Body() body: ApproverReportDto, @Param('id') id: string){
    return this.reportService.update(body.approved, id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string){
    return this.reportService.delete(id);
  }

}

