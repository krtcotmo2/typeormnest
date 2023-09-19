import {
    IsBoolean,
    IsDate,
    IsInt,
  } from 'class-validator';
  import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
  
  @Entity()
  export class Charlevels {
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;

    @Column()
    @IsInt()
    charID: number;

    @Column()
    @IsInt()
    classID: number;

    @Column()
    @IsInt()
    classLevel: number;
  
    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;

  }