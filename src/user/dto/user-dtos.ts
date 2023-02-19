import { Expose } from "class-transformer";
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";


export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

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
  username: string;

  @Expose()
  email: string;
}