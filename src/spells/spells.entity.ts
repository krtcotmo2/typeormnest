import {
    IsBoolean,
    IsDate,
    IsInt,
    IsNumber,
    IsOptional,
    IsPort,
    IsString,
  } from 'class-validator';
  import { Modifier } from 'src/common/modifier';
  import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
  
  @Entity()
  export class Charspells{
    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column()
    @IsNumber()
    @IsOptional()
    spellID: number;

    @Column()
    @IsNumber()
    charID: number;

    @Column()
    @IsNumber()
    @IsOptional()
    spellLevel: number;

    @Column()
    @IsString()
    spellName: string;

    @Column()
    @IsBoolean()
    @IsOptional()
    isCast: boolean;

    
    @Column()
    @IsDate()
    createdAt: Date;

    @Column()
    @IsDate()
    updatedAt: Date;
  }
