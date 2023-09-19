import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class ArmorGroupCreate {
  @IsInt()
  charID: number;

  @IsString()
  acDesc: string;

  @IsOptional()
  @IsBoolean()
  pinned?: boolean;

  @IsInt()
  sortValue: number;
}

export class ArmorModLine {
  @IsOptional()
  @IsInt()
  id: number;

  @IsInt()
  charID: number;

  @IsInt()
  acID: number;

  @IsInt()
  score: number;
  
  @IsString()
  modDesc: string;

  @IsBoolean()
  isBase: boolean;

  @IsBoolean()
  isMod: boolean;

  @IsBoolean()
  aidsFlatfoot: boolean;

  @IsBoolean()
  aidsTouchAttach: boolean;
}
