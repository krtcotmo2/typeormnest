import {
    IsString,
    IsDate,
    IsInt,
  } from 'class-validator';


  export class CharLevelsDto {
    @IsInt()
    id: number;

    @IsInt()
    charID: number;

    @IsInt()
    classID: number;

    @IsInt()
    classLevel: number;
    
    @IsDate()
    createdAt: Date;
 
    @IsDate()
    updatedAt: Date;

  }