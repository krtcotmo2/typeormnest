import { Expose } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class MinimalNoteDto{
    @IsInt()
    noteID: number;

    @IsInt()
    charID: number;

    @IsInt()
    noteOrder: number;

    @IsString()
    noteTitle: string;
  }

  
  export class NoteItemDto{
    @IsInt()
    id: number;

    @IsInt()
    itemOrder: number;

    @IsString()
    itemDetails: string;

    @IsDate()
    @IsOptional()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    updatedAt: Date;

    @IsInt()
    @IsOptional()
    noteID: number;
  }