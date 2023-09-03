import {
  IsBoolean,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    isDecimal,
  } from 'class-validator';
  import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  
  @Entity()
  export class Charequip {
    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column()
    @IsNumber()
    charID: number;

    @Column()
    @IsString()
    equip: string;
  
    @Column('decimal')
    @IsNumber()
    weight: number;

    @Column()
    @IsString()
    @IsOptional()
    location: string;
  
    @Column()
    @IsNumber()
    equipOrder: number;

    @Column()
    @IsBoolean()
    partOfOverallWeight: boolean;

    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;
  }
  