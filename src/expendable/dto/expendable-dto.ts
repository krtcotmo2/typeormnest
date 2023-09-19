import { IsInt, IsOptional, IsString, IsBoolean, IsDate } from "class-validator";

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
     qty: number;
   }

   
export class SaveExpendablesDto {
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
   qty: number;

   @IsDate()
   @IsOptional()
   updatedAt: Date
 }