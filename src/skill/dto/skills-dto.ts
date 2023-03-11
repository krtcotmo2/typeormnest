import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class DefaultSkill {
  @IsInt()
  id: number;

  @IsInt()
  charID: number;

  @IsInt()
  skillID: number;

  @IsInt()
  score: number;

  @IsBoolean()
  isClassSkill: boolean;

  @IsBoolean()
  isRanks: boolean;

  @IsBoolean()
  isMod: boolean;

  @IsString()
  @IsOptional()
  modDesc: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
