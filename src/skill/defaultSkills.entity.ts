import {
    IsBoolean,
    IsDate,
    IsInt,
    IsString,
  } from 'class-validator';
  import { Column, Entity, PrimaryColumn } from 'typeorm';
  
  @Entity()
  export class Skills {
    @PrimaryColumn()
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
  