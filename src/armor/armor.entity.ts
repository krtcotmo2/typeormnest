import {
    IsBoolean,
    IsDate,
    IsInt,
    IsString,
  } from 'class-validator';
  import { Column, Entity, PrimaryColumn } from 'typeorm';
  
  @Entity()
  export class Acs {
    @PrimaryColumn()
    @IsInt()
    acID: number;

    @Column()
    @IsInt()
    charID: number;

    @Column()
    @IsString()
    acDesc: string;

    @PrimaryColumn()
    @IsInt()
    sortValue: number;
  
    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;

  }