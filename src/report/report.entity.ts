
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, BeforeInsert, BeforeUpdate, BeforeRemove, AfterRemove, AfterUpdate, ManyToOne, JoinColumn } from "typeorm";
import { IsInt, isDecimal, IsOptional, IsString, IsDecimal } from "class-validator";
import { Users } from "src/user/user.entity";

@Entity()
export class Report{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: false})
  @IsDecimal()
  approved: boolean;

  @Column()
  @IsString()
  make: string;

  @Column()
  @IsString()
  model: string;

  @Column()
  @IsInt()
  year: number;

  @Column()
  @IsDecimal()
  lat: number;

  @Column()
  @IsDecimal()
  long: number;

  @Column()
  @IsDecimal()
  price: number;

  @Column()
  @IsDecimal()
  milage: number;

   /***** LOGGERS FOR EVENTS *****/
   @BeforeInsert()
   logPreInsert(){
     console.log('Attempting to insert', this.year, this.make , this.model);
   }
   @AfterInsert()
   logInserted(){
     console.log('Successfully added',  this.year, this.make , this.model, 'with id', this.id);
   }
   @BeforeUpdate()
   logPreUpdate(){
     console.log('Attempting to update vehicle with id', this.id);
   }
   @AfterUpdate()
   logUpdated(){
     console.log('Successfully updated vehicle with id',  this.id);
   }
   @BeforeRemove()
   logPreRemove(){
     console.log('Attempting to delete vehicle with id',  this.id);
   }
   @AfterRemove()
   logRemoved(){
     console.log('Successfully deleted vehicle with id', this.id);
   }
}