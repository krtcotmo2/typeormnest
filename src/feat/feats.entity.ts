import {
    IsBoolean,
    IsDate,
    IsInt,
    IsString,
  } from 'class-validator';
  import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
  
  @Entity()
  export class Feats {
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;
  
    @Column()
    @IsString()
    name: string;
  
    @Column()
    @IsInt()
    type: string;
  
    @Column()
    @IsInt()
    shortdescription: string;
  
    @Column()
    @IsInt()
    prerequisites: string;
  
    @Column()
    @IsInt()
    prerequisitie_feats: string;
  
    @Column()
    @IsInt()
    benefit: string;
  
    @Column()
    @IsInt()
    normal: string;
  
    @Column()
    @IsInt()
    special: string;
  
    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;
  }
  