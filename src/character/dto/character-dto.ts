import { IsBoolean, IsDate, IsIdentityCard, IsInt, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { DefinedStats } from "src/stat/dto/stat-dto";
import { DefinedSaves } from "src/saves/dto/saves-dto";
import { Alignment } from "src/enum/alignments";
import { DefinedSKill } from "src/skill/dto/skills-dto";

export class CharactersDto {
  @IsInt()
  charID: number;

  @IsInt()
  userID: number;

  @IsString()
  charName: string;

  @IsInt()
  charHP: number;
  
  @IsInt()
  CharXP: number;
  
  @IsInt()
  raceID: number;
  
  @IsInt()
  alignID: number;
  
  @IsInt()
  init: number;
  
  @IsBoolean()
  isDead: boolean;
  
  @IsDate()
  createdAt: Date;
  
  @IsDate()
  updatedAt: Date;
  
  @IsString()
  image: string;
  
}

export class SaveCharactersDto {
 @IsInt()
  userID: number;

  @IsInt()
  @IsOptional()
  charID: number;

  @IsString()
  charName: string;

  @IsInt()
  charHP: number;
  
  @IsInt()
  CharXP: number;
  
  @IsInt()
  raceID: number;
  
  @IsInt()
  alignID: number;
  
  @IsInt()
  init: number;
  
  @IsBoolean()
  isDead: boolean;
  
  @IsString()
  @IsOptional()
  image: string;
}

export class UpdateCharactersDto {
  @IsInt()
  @IsOptional()
   userID: number;
 
   @IsString()
   @IsOptional()
   charName: string;
 
   @IsInt()
   @IsOptional()
   charHP: number;
   
   @IsInt()
   @IsOptional()
   CharXP: number;
   
   @IsInt()
   @IsOptional()
   raceID: number;
   
   @IsInt()
   @IsOptional()
   alignID: number;
   
   @IsInt()
   @IsOptional()
   init: number;
   
   @IsBoolean()
   @IsOptional()
   isDead: boolean;
   
   @IsString()
   @IsOptional()
   image: string;
 }
export class baseChar {
  @Expose()
  charID: number;

  @Expose()
  userID: number;

  @Expose()
  charName: string;

  @Expose()
  charHP: number;
  
  @Expose()
  CharXP: number;
  
  @Expose()
  raceID: number;
  
  @Expose()
  alignID: number;
  
  @Expose()
  init: number;
  
  @Expose()
  isDead: boolean;
  
  @Expose()
  image: string;
}

export class CharWithStats {
  @Expose()
  charID: number;

  @Expose()
  userID: number;

  @Expose()
  charName: string;

  @Expose()
  charHP: number;
  
  @Expose()
  CharXP: number;
  
  @Expose()
  race: string;
  
  @Expose()
  alignment: string

  @Expose()
  init: number;
  
  @Expose()
  isDead: boolean;
  
  @Expose()
  image: string;

  @Expose()
  stats: DefinedStats;

  @Expose()
  saves: DefinedSaves;

  @Expose()
  skills: DefinedSKill[];
}