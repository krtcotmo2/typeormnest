import {
    IsBoolean,
    IsDate,
    IsInt,
    IsString,
  } from 'class-validator';
import { Modifier } from 'src/common/modifier';
  import { Column, Entity, PrimaryColumn } from 'typeorm';
  
  @Entity()
  export class Noteitems{
    @PrimaryColumn()
    @IsInt()
    id:number;

    @Column()
    @IsInt()
    noteID:number;

    @Column()
    @IsInt()
    itemOrder: number;

    @Column()
    @IsString()
    itemDetails: string;
  
    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;

  }