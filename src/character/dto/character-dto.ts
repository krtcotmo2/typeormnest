import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";
import { Expose } from "class-transformer";

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