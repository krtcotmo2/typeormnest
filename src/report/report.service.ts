import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ApproverReportDto, CreateReportDto, EstimateDto } from './dto/report-dtos';
import { Report } from './report.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { getAveragePrice } from './business-logic/report-business-logic';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private repo: Repository<Report>
  ){}

  async findAll(){
    // did not show the user data. needed to use the createQueryBuilder (see useQueryBuilder)
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

  async getEstimate(searchParam: EstimateDto){
    const list = await this.repo.find({
      where: {
        model: searchParam.model,
        make: searchParam.make,
      },
      order:{
        
      }
    });

    return {
      make: searchParam.make,
      model: searchParam.model,
      price: +(getAveragePrice(list).toFixed(2)),
    }
  }

  async useQueryBuilder(searchParam: EstimateDto){
    const { make, model, year, milage} = searchParam;
    const list = await this.repo.createQueryBuilder()
      .select('*')
      .where({
        make: make, 
        model: model,
        year: Between(year-20, year+20)
      })
      .orWhere(
        {make: "Nissan"}
      )
      // another possible way but nota s clean
      // .where( 'make=:make', {make})
      // .andWhere('model=:model', {model})
      // .andWhere('year - :year BETWEEN -20 AND 20', {year})
      // .andWhere('approved IS TRUE')
      .orderBy('year', "DESC")
      .addOrderBy('price', "DESC")
      .limit(20)
      .getRawMany();
      
    //const avgPrice = getAveragePrice(list);  
    console.log(list);
    return list
    // return {'average-price': avgPrice};
  }
  
}
