import {
    IsBoolean,
    IsDate,
    IsInt,
  } from 'class-validator';
  import { Column, Entity, PrimaryColumn } from 'typeorm';
  
  @Entity()
  export class Charfeats {
    @PrimaryColumn()
    @IsInt()
    id: number;
  
    @Column()
    @IsInt()
    featID: number;;
  
    @Column()
    @IsInt()
    charID: number;
  
    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;
  }
  