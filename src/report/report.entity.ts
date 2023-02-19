
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lat: number;

  @Column()
  long: number;

  @Column()
  price: number;
}