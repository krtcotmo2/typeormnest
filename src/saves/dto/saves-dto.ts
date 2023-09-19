import { Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatType } from 'src/enum/stat-type';

export class DefinedSaves {
  @Expose()
  fortitude: {
    value: number;
    breakdown: {
      id: number;
      score: number;
      type: StatType;
      modDesc: string;
    }[];
  };
  @Expose()
  reflex: {
    value: number;
    breakdown: {
      id: number;
      score: number;
      type: StatType;
      modDesc: string;
    }[];
  };
  @Expose()
  will: {
    value: number;
    breakdown: {
      id: number;
      score: number;
      type: StatType;
      modDesc: string;
    }[];
  };
}

export class UpdateSavesDto {
  @IsNumber()
  id: number;

  @IsNumber()
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

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}

export class CreateSavesDto {@IsNumber()
  @IsOptional()
  charID: number;

  @IsNumber()
  saveID: number;

  @IsNumber()
  score: number;

  @IsBoolean()
  isBase: boolean;

  @IsBoolean()
  isMod: boolean;

  @IsString()
  @IsOptional()
  modDesc: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
