import {
    IsBoolean,
    IsDate,
    IsInt,
    IsString,
  } from 'class-validator';
  import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
  
  @Entity()
  export class Skills {
    @PrimaryGeneratedColumn()
    @IsInt()
    skillID: number;
  
    @Column()
    @IsString()
    skillName: string;
  
    @Column()
    @IsString()
    skillDesc: string;
  
    @Column()
    @IsBoolean()
    untrained: boolean;
  
    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;
  }
  