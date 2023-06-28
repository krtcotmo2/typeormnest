import { Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsOptional, IsString } from "class-validator";


export class CreateUserDto {
  @IsOptional()
  @IsString()
  userName: string;
  
  @IsString()
  userPassword: string;
  
  @IsEmail()
  @IsString()
  userEmail: string;

  @IsOptional()
  @IsBoolean()
  forcedReset: boolean
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsInt()
  age: number

  @IsOptional()
  @IsBoolean()
  administrator: boolean
}

export class ScrubbedUserDto{
  @Expose()
  userID: number;
  
  @Expose()
  userName: string;

  @Expose()
  userEmail: string;

  @Expose()
  forcedReset: boolean;

  // @Expose()
  // administrator: boolean;
}


export class LoginUserDto {
  @IsString()
  userPassword: string;
  
  @IsEmail()
  @IsString()
  userEmail: string;

  @IsOptional()
  @IsBoolean()
  forcedReset: boolean
}