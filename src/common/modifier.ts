import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export class Modifier {
  @PrimaryColumn()
  @IsInt()
  id: number;

  @Column()
  @IsInt()
  charID: number;

  @Column()
  @IsInt()
  score: number;

  @Column()
  @IsBoolean()
  isMod: boolean;

  @Column()
  @IsString()
  @IsOptional()
  modDesc: string;

  @Column()
  @IsDate()
  createdAt: Date;

  @Column()
  @IsDate()
  updatedAt: Date;
}
