import { Expose } from "class-transformer";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class ScrubbedSpellDto{
    @Expose()
    id: number;
    
    @Expose()
    charID: number;

    @Expose()
    spellLevel: number;

    @Expose()
    spellName: string;

    @Expose()
    isCast: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
  }

  export class MinimalSpellDto{
    @Expose()
    id: number;

    @Expose()
    spellLevel: number;

    @Expose()
    spellName: string;

    @Expose()
    isCast: boolean;
  }

  export class UpdateSpellDto{
    @IsInt()
    id: number;
    
    @IsInt()
    @IsOptional()
    charID: number;
   
    @IsInt()
    @IsOptional()
    spellLevel: number;

    @IsString()
    @IsOptional()
    spellName: string;

    @IsBoolean()
    isCast: boolean;
  }