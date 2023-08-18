import { Expose } from "class-transformer";
import { IsInt, IsString } from "class-validator";

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