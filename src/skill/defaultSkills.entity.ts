import {
    IsBoolean,
    IsDate,
    IsInt,
  } from 'class-validator';
  import { Column, Entity, PrimaryColumn } from 'typeorm';
  
  @Entity()
  export class Skills {
    @PrimaryColumn()
    @IsInt()
    skillID: number;
  
    @Column()
    @IsInt()
    skillName: string;
  
    @Column()
    @IsInt()
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
  