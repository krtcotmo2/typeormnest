import { Expose, Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, IsDecimal, Min, Max, IsLatitude, IsLongitude, isBoolean, IsBoolean, } from "class-validator";
import { User } from "src/user/user.entity";

export class CreateReportDto{
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  @Min(1930)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  long: number;

  @Min(0)
  @Max(1000000)
  price: number;

  @Min(0)
  @Max(1000000)
  milage: number;

}

export class ReportDto{
  @Expose()
  id: number;
  @Expose()
  approved: boolean;
  @Transform( ({obj}) => obj.user.id)
  @Expose()
  userId: number;
  @Expose()
  make: string;
  @Expose()
  year:number;
  @Expose()
  lat: number;
  @Expose()
  long: number;
  @Expose()
  price: number;
  @Expose()
  milage: number;  
}

export class ReportCreatorDto{
  @IsInt()
  userId: number;
}

export class ApproverReportDto{
  @IsBoolean()
  approved: boolean;
}

export class EstimateDto{
  @IsString()
  make: string;

  @IsString()
  model: string;

  // in this case the deconstruction just gets the the year property.
  @Transform( ({value}) => +value )
  @IsInt()
  @Min(1930)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @IsOptional()
  @IsLatitude()
  lat: number;

  @IsOptional()
  @IsLongitude()
  long: number;

  @Transform( ({value}) => +value )
  @IsOptional()
  @Min(0)
  @Max(1000000)
  milage: number;
} 