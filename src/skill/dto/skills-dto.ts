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

  @IsBoolean()
  pinned: boolean;

  @IsString()
  @IsOptional()
  modDesc: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}


export class DefinedSKill {
  @IsInt()
  id: number;

  @IsInt()
  charID: number;

  @IsString()
  skillName: string;

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

  @IsBoolean()
  pinned: boolean;

  @IsString()
  @IsOptional()
  modDesc: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class UpdateSkillDto {
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

  @IsBoolean()
  @IsOptional()
  isClassSkill: boolean;

  @IsString()
  @IsOptional()
  modDesc: string;
}