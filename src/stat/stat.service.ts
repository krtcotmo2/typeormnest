import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from 'src/app-data-source';
import { StatType } from 'src/enum/stat-type';
import { DefinedStats } from './dto/stat-dto';
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
    const definedStats = new DefinedStats();
    definedStats.str = this.getValues(
      stats.filter((stat) => stat.statID === 1),
    );
    definedStats.dex = this.getValues(
      stats.filter((stat) => stat.statID === 2),
    );
    definedStats.con = this.getValues(
      stats.filter((stat) => stat.statID === 3),
    );
    definedStats.int = this.getValues(
      stats.filter((stat) => stat.statID === 4),
    );
    definedStats.wis = this.getValues(
      stats.filter((stat) => stat.statID === 5),
    );
    definedStats.chr = this.getValues(
      stats.filter((stat) => stat.statID === 6),
    );
    return definedStats;
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

  private getValues = (arr: any[]) => {
    return {
      value: arr.reduce((origin, stat) => origin + stat.score, 0),
      breakdown: arr.map((stat) => {
        return {
          id: stat.id,
          score: stat.score,
          type: stat.isBase ? StatType.BASE : StatType.MODIFIER,
          modDesc: stat.modDesc,
        };
      }),
    };
  };
}
