import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApproverReportDto, CreateReportDto } from './dto/report-dtos';
import { Report } from './report.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private repo: Repository<Report>
  ){}

  async findAll(){
    return await this.repo.find({relations : ['user'], loadRelationIds:true})
      .then(reports => {
        return reports
      })
      .catch(err => {
        console.log('fu', err)
      });
  }
  
  async findOne(id: number){
    if(!id){
      throw new BadRequestException('Null Exception');;
    }
    return await this.repo.findOneBy({id});
  }
  
  async create(body: CreateReportDto, user: User ){
    const report = await this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }

  async delete(id: string){
    const report = await this.findOne(+id);
    if(!report){
      throw new NotFoundException('Report not found');
    }
    return this.repo.remove(report);
  }

  async update(approved: boolean, id: string){
    const report = await this.repo.findOne( { where: { id: +id } } );
    if(!report){
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
