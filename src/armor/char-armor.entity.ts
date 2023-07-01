import {
    IsBoolean,
    IsDate,
    IsInt,
  } from 'class-validator';
import { Modifier } from 'src/common/modifier';
  import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
  
  @Entity()
  export class Charac extends Modifier{
    @Column()
    @IsInt()
    acID: number;

    @Column()
    @IsBoolean()
    isBase: boolean;

  }