import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/app-data-source';
import { buildCharStats, getValues } from './business-logic/stat-helper';
import { Charstats } from './stat.entity';

@Injectable()
export class StatService {
  async getCharStats(charId: string) {
    const stats = await AppDataSource.manager.findBy(Charstats, {
      charID: +charId,
    });

    if (stats.length === 0) {
      throw new NotFoundException('Character and/or Stats Not Found');
    }
    return buildCharStats(stats);
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

 
}
