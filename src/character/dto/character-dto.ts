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