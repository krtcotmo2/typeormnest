import { IsBoolean, IsEmail, IsInt, isInt, IsOptional, IsString } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, BeforeInsert, BeforeUpdate, BeforeRemove, AfterRemove, AfterUpdate, OneToMany, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Report } from "src/report/report.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;
  
  @Column()
  @IsString()
  @Exclude()
  //exclude is universal and can never be called back in a response so not good if you want to hide 
  password: string;

  @OneToMany( () => Report, (report) => report.user )
  reports: Report[];

  @Column()
  @IsString()
  username: string;

  @Column({default: false})
  @IsBoolean()
  administrator: boolean;

  // demo of sensitive info filtered by custom interceptor.
  @Column({ type: 'int', nullable: true})
  @IsInt()
  age: number;




  /***** LOGGERS FOR EVENTS *****/
  @BeforeInsert()
  logPreInsert(){
    console.log('Attempting to insert', this.username);
  }
  @AfterInsert()
  logInserted(){
    console.log('Successfully added', this.username, 'with id', this.id);
  }
  @BeforeUpdate()
  logPreUpdate(){
    console.log('Attempting to update', this.username, 'with id', this.id);
  }
  @AfterUpdate()
  logUpdated(){
    console.log('Successfully updated', this.username, 'with id', this.id);
  }
  @BeforeRemove()
  logPreRemove(){
    console.log('Attempting to delete', this.username);
  }
  @AfterRemove()
  logRemoved(){
    console.log('Successfully deleted', this.username, 'with id', this.id);
  }


  

  
}