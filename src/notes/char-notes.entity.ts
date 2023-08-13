import {
    IsBoolean,
    IsDate,
    IsInt,
    IsString,
  } from 'class-validator';
  import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Noteitems } from './notes.entity';
  
  @Entity()
  export class Charnotes{

    @PrimaryGeneratedColumn()
    @IsInt()
    noteID: number;

    @Column()
    @IsInt()
    charID: number;

    @Column()
    @IsInt()
    noteOrder: number;

    @Column()
    @IsString()
    noteTitle: string;
  
    @Column()
    @IsDate()
    createdAt: Date;
  
    @Column()
    @IsDate()
    updatedAt: Date;

    @OneToMany(() => Noteitems, note=> note.noteID, {
      cascade: true
    } )
    notes: Noteitems[];
  }