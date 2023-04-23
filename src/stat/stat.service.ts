import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { errorHandler } from 'src/interceptors/errorHandler';
import { buildCharStats, getValues } from './business-logic/stat-helper';
import { SaveStatDto, StatDto, UpdateStatDto } from './dto/stat-dto';
import { Charstats } from './stat.entity';

@Injectable()
export class StatService {
  
  getCharStats(charId: string) {
    return from(AppDataSource.manager.findBy(Charstats, {
      charID: +charId,
    })).pipe(
      switchMap( statList => {
        if(statList.length < 1){
          return of([])
          //errorHandler(new NotFoundException('stat_not_found'));
        }
        return of(statList);
      }),
    );

  }

  async getSingleStat(charId: string, statId: string) {
    const stat = await AppDataSource.manager.findBy(Charstats, {
      charID: +charId,
      statID: +statId,
    });
    if (stat.length === 0) {
      throw new NotFoundException('stat_not_found');
    }
    return stat;
  }

  updateStatLine(values: UpdateStatDto): Observable<any> {
    return from(AppDataSource.manager.update(
      Charstats,
      {id: values.id},
      {
        ...values, 
        updatedAt: new Date()
      }));
  }

  createStatLine(values: SaveStatDto): Observable<Charstats> {
    const a = AppDataSource.manager.create(Charstats, values);
    return from(AppDataSource.manager.save(Charstats, {
      ...a,
      updatedAt: new Date(),
      createdAt: new Date(),
    }));
  }

  deleteStatLine(id: string){
    return from(AppDataSource.manager.delete(
      Charstats,
      {id: +id},
    ));
  }

  private getSingleStaById(id: string) {
    return AppDataSource.manager.findOneBy(Charstats, {
        id: +id,
      })
  }
 
}
