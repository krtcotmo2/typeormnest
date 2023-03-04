import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Characters {
  @PrimaryColumn()
  @IsInt()
  charID: number;

  @Column()
  @IsInt()
  userID: number;

  @Column()
  @IsString()
  charName: string;

  @Column()
  @IsInt()
  charHP: number;

  @Column()
  @IsInt()
  CharXP: number;

  @Column()
  @IsInt()
  raceID: number;

  @Column()
  @IsInt()
  alignID: number;

  @Column()
  @IsInt()
  init: number;

  @Column()
  @IsBoolean()
  isDead: boolean;

  @Column()
  @IsDate()
  createdAt: Date;

  @Column()
  @IsDate()
  updatedAt: Date;

  @Column()
  @IsString()
  image: string;
  
}