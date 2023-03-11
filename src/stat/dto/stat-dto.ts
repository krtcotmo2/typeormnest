import { Expose } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { StatType } from 'src/enum/stat-type';

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
  isBase: boolean;

  @Expose()
  isMod: boolean;

  @Expose()
  modDesc: string;
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

export class SaveStatDto {
  @IsInt()
  @IsOptional()
  charID: number;

  @IsInt()
  statID: number;

  @IsInt()
  score: number;

  @IsBoolean()
  isBase: boolean;

  @IsBoolean()
  isMod: boolean;

  @IsString()
  @IsOptional()
  modDesc: string;
}
export class UpdateStatDto {
  @IsInt()
  id: number;

  @IsInt()
  @IsOptional()
  score: number;

  @IsBoolean()
  @IsOptional()
  isBase: boolean;

  @IsBoolean()
  @IsOptional()
  isMod: boolean;

  @IsString()
  @IsOptional()
  modDesc: string;
}
