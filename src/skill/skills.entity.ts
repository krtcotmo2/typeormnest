import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Modifier } from 'src/common/modifier';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  pinned: boolean;
  
  @Column()
  @IsBoolean()
  isClassSkill: boolean;

  @Column()
  @IsBoolean()
  isRanks: boolean;
  
}
