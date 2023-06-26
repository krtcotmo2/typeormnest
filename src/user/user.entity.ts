import { IsBoolean, IsEmail, IsInt, isInt, IsOptional, IsString } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, BeforeInsert, BeforeUpdate, BeforeRemove, AfterRemove, AfterUpdate, OneToMany, JoinColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Report } from "src/report/report.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column()
  @IsEmail()
  userEmail: string;
  
  @Column()
  @IsString()
  @Exclude()
  //exclude is universal and can never be called back in a response so not good if you want to hide 
  userPassword: string;

  // @OneToMany( () => Report, (report) => report.user )
  // reports: Report[];

  @Column()
  @IsString()
  userName: string;

  // @Column({default: false})
  // @IsBoolean()
  // administrator: boolean;

  // demo of sensitive info filtered by custom interceptor.
  // @Column({ type: 'int', nullable: true})
  // @IsInt()
  // age: number;




  /***** LOGGERS FOR EVENTS *****/
  @BeforeInsert()
  logPreInsert(){
    console.log('Attempting to insert', this.userName);
  }
  @AfterInsert()
  logInserted(){
    console.log('Successfully added', this.userName, 'with id', this.userID);
  }
  @BeforeUpdate()
  logPreUpdate(){
    console.log('Attempting to update', this.userName, 'with id', this.userID);
  }
  @AfterUpdate()
  logUpdated(){
    console.log('Successfully updated', this.userName, 'with id', this.userID);
  }
  @BeforeRemove()
  logPreRemove(){
    console.log('Attempting to delete', this.userName);
  }
  @AfterRemove()
  logRemoved(){
    console.log('Successfully deleted', this.userName, 'with id', this.userID);
  }


  

  
}