import { IsInt, IsOptional, IsString, IsBoolean } from "class-validator";

export class UpdateExpendablesDto {
    @IsInt()
     id: number;
   
     @IsInt()
     @IsOptional()
     charID: number;
   
     @IsString()
     @IsOptional()
     expType: string;
     
     @IsString()
     @IsOptional()
     description: string;

     @IsInt()
     @IsOptional()
     CharXP: number;
     
     @IsInt()
     @IsOptional()
     qty: number;
   }