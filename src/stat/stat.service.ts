import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { errorHandler } from 'src/interceptors/errorHandler';
import { buildCharStats, getValues } from './business-logic/stat-helper';
import { SaveStatDto, StatDto, UpdateStatDto } from './dto/stat-dto';
import { Charstats } from './stat.entity';

@Injectable()
export class StatService {
  async getCharStats(charId: string) {
    const stats = await AppDataSource.manager.findBy(Charstats, {
      charID: +charId,
    });

    if (stats.length === 0) {
      // errorHandler(new NotFoundException('Character and/or Stats Not Found MF'));
    }
    return stats;
  }

  async getSingleStat(charId: string, statId: string) {
    const stat = await AppDataSource.manager.findBy(Charstats, {
      charID: +charId,
      statID: +statId,
    });
    if (stat.length === 0) {
      throw new NotFoundException('Stat Not Found');
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
