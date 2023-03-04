import { Expose } from 'class-transformer';
import { StatType } from 'src/enum/stat-type';
import { Charstats } from '../stat.entity';

export class StatDto {
  @Expose()
  id: number;

  @Expose()
  charID: number;

  @Expose()
  statID: number;

  @Expose()
  score: number;

  @Expose()
  isBase: number;

  @Expose()
  isMod: number;

  @Expose()
  modDesc: number;
}

export class DefinedStats {
  @Expose()
  str: {
    value: number;
    breakdown: {
      id: number;
      score: number;
      type: StatType;
      modDesc: string;
    }[];
  };
  @Expose()
  dex: {
    value: number;
    breakdown: {
      id: number;
      score: number;
      type: StatType;
      modDesc: string;
    }[];
  };
  @Expose()
  con: {
    value: number;
    breakdown: {
      id: number;
      score: number;
      type: StatType;
      modDesc: string;
    }[];
  };
  @Expose()
  int: {
    value: number;
    breakdown: {
      id: number;
      score: number;
      type: StatType;
      modDesc: string;
    }[];
  };
  @Expose()
  wis: {
    value: number;
    breakdown: {
      id: number;
      score: number;
      type: StatType;
      modDesc: string;
    }[];
  };
  @Expose()
  chr: {
    value: number;
    breakdown: {
      id: number;
      score: number;
      type: StatType;
      modDesc: string;
    }[];
  };
}
