import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, BeforeInsert, BeforeUpdate, BeforeRemove, AfterRemove, AfterUpdate} from "typeorm";
import { Exclude } from "class-transformer";

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

  @Column()
  @IsOptional()
  @IsBoolean()
  forcedReset: boolean;

  @Column()
  @IsString()
  userName: string;

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
    console.log('Attempting to update', this.userName, 'with id', this.userID, this.userPassword);
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