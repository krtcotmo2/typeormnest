import {
    IsBoolean,
    IsDate,
    IsInt,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
  
  @Entity()
  export class Acs {
    @PrimaryGeneratedColumn()
    @IsInt()
    acID: number;

    @Column()
    @IsInt()
    charID: number;

    @Column()
    @IsString()
    acDesc: string;

    @Column()
    @IsInt()
    sortValue: number;

    @Column()
    @IsOptional()
    @IsBoolean()
    pinned: boolean;
  
    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;

  }