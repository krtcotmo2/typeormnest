import {
    IsBoolean,
    IsDate,
    IsIn,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';

  export class UpdateToHitDto {
    @IsInt()
    id: number;
  
    @IsNumber()
    charID: number;

    @IsInt()
    score: number;
  
    @IsBoolean()
    @IsOptional()
    isBase: boolean;
  
    @IsBoolean()
    @IsOptional()
    isMod: boolean;
  
    @IsNumber()
    @IsOptional()
    toHitID: number;
  
    @IsString()
    @IsOptional()
    modDesc: string;
  }

  export class NewToHit {
    @IsNumber()
    charID: number;

    @IsInt()
    score: number;
  
    @IsBoolean()
    @IsOptional()
    isBase: boolean;
  
    @IsBoolean()
    @IsOptional()
    isMod: boolean;
  
    @IsNumber()
    @IsOptional()
    toHitID: number;
  
    @IsString()
    @IsOptional()
    modDesc: string;
  }
  