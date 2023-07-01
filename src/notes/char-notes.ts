import {
    IsBoolean,
    IsDate,
    IsInt,
    IsString,
  } from 'class-validator';
  import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
  
  @Entity()
  export class Charnotes{

    @PrimaryGeneratedColumn()
    @IsInt()
    noteID: number;

    @Column()
    @IsInt()
    charID: number;

    @Column()
    @IsInt()
    noteOrder: number;

    @Column()
    @IsString()
    noteTitle: string;
  
    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;

  }