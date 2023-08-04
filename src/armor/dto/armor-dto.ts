import { IsInt, IsString } from 'class-validator';

export class ArmorGroupCreate {
  @IsInt()
  charID: number;

  @IsString()
  acDesc: string;

  @IsInt()
  sortValue: number;
}
