import {
    IsBoolean,
    IsDate,
    IsInt,
    IsString,
  } from 'class-validator';
import { Modifier } from 'src/common/modifier';
  import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Charnotes } from './char-notes.entity';
  
  @Entity()
  export class Noteitems{
    @PrimaryGeneratedColumn()
    @IsInt()
    id:number;

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
  
    @ManyToOne(() => Charnotes, charnotes => charnotes.notes)
    @IsInt()
    @JoinColumn( {name: 'noteID'})
    noteID: number

  }