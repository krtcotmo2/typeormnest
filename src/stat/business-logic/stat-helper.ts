import { StatType } from 'src/enum/stat-type';
import { DefinedStats } from '../dto/stat-dto';
import { Charstats } from '../stat.entity';

export const getValues = (arr: any[]) => {
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

export const buildCharStats = (stats: Charstats[]): DefinedStats => {
    const definedStats = new DefinedStats();
    definedStats.str = getValues(
      stats.filter((stat) => stat.statID === 1),
    );
    definedStats.dex = getValues(
      stats.filter((stat) => stat.statID === 2),
    );
    definedStats.con = getValues(
      stats.filter((stat) => stat.statID === 3),
    );
    definedStats.int = getValues(
      stats.filter((stat) => stat.statID === 4),
    );
    definedStats.wis = getValues(
      stats.filter((stat) => stat.statID === 5),
    );
    definedStats.chr = getValues(
      stats.filter((stat) => stat.statID === 6),
    );
    return definedStats;
}
