import {
    IsDate,
    IsNumber,
    IsString,
  } from 'class-validator';
  import {
    Entity,
    Column,
    PrimaryColumn,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  
  @Entity()
  export class Charequip {
    @PrimaryColumn()
    @IsNumber()
    id: number;

    @Column()
    @IsNumber()
    charID: number;

    @Column()
    @IsString()
    equip: string;
  
    @Column()
    @IsNumber()
    weight: number;

    @Column()
    @IsString()
    location: string;
  
    @Column()
    @IsNumber()
    equipOrder: number;

    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;
  }
  