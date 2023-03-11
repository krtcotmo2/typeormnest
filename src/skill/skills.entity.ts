import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Modifier } from 'src/common/modifier';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Charskills extends Modifier {
  @Column()
  @IsInt()
  skillID: number;

  @Column()
  @IsInt()
  score: number;

  @Column()
  @IsBoolean()
  isRanks: boolean;
  
}
