import {
    IsBoolean,
    IsDate,
    IsInt,
  } from 'class-validator';
  import { Column, Entity, PrimaryColumn } from 'typeorm';
  
  @Entity()
  export class Charlevels {
    @PrimaryColumn()
    @IsInt()
    id: number;

    @PrimaryColumn()
    @IsInt()
    charID: number;

    @PrimaryColumn()
    @IsInt()
    classID: number;

    @PrimaryColumn()
    @IsInt()
    classLevel: number;
  
    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;

  }