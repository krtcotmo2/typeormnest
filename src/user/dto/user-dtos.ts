import { Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsOptional, IsString } from "class-validator";


export class CreateUserDto {
  @IsString()
  userName: string;
  
  @IsString()
  userPassword: string;
  
  @IsOptional()
  @IsEmail()
  @IsString()
  userEmail: string;

  // @IsOptional()
  // @IsInt()
  // age: number
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
  id: number;
  
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  administrator: boolean;
}