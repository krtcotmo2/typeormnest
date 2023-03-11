import {
  IsBoolean,
  IsEmail,
  IsInt,
  isInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  BeforeInsert,
  BeforeUpdate,
  BeforeRemove,
  AfterRemove,
  AfterUpdate,
  OneToMany,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Report } from 'src/report/report.entity';
import { Modifier } from 'src/common/modifier';

@Entity()
export class Chartohits extends Modifier {
  @PrimaryColumn()
  @IsNumber()
  toHitID: number;

  @Column()
  @IsBoolean()
  isBase: boolean;
}
