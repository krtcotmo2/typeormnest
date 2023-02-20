import { Expose } from "class-transformer";
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";


export class CreateUserDto {
  @IsString()
  username: string;
  
  @IsString()
  password: string;
  
  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsInt()
  age: number
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
  username: string;

  @IsOptional()
  @IsInt()
  age: number
}

export class ScrubbedUserDto{
  @Expose()
  id: number;
  
  @Expose()
  username: string;

  @Expose()
  email: string;
}