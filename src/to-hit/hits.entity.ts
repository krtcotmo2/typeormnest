import { IsBoolean, IsDate, IsEmail, IsInt, isInt, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, BeforeInsert, BeforeUpdate, BeforeRemove, AfterRemove, AfterUpdate, OneToMany, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Report } from "src/report/report.entity";
import { Modifier } from "src/common/modifier";

@Entity()
export class Tohits{

  @PrimaryGeneratedColumn()
  @IsNumber()
  toHitID: number;

  @Column()
  @IsNumber()
  toHitOrder: number;

  @Column()
  @IsString()
  toHitDesc: string;

  @Column()
  @IsString()
  damage: string;

  @Column()
  @IsString()
  critRange: string;

  @Column()
  @IsString()
  critDamage: string;

  @Column()
  @IsDate()
  createdAt: Date;

  @Column()
  @IsDate()
  updatedAt: Date;
}