import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Charsaves{
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;

    @Column()
    @IsInt()
    charID: number;

    @Column()
    @IsInt()
    saveID: number;

    @Column()
    @IsInt()
    score: number;

    @Column()
    @IsBoolean()
    isBase: boolean;

    @Column()
    @IsBoolean()
    isMod: boolean;

    @Column()
    @IsString()
    modDesc: string;

    @Column()
    @IsDate()
    createdAt: Date;

    @Column()
    @IsDate()
    updatedAt: Date;
}