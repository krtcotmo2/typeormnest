import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// ENTITY NAME MUST MATCH THE TABLE NAME
@Entity()
export class Charstats {
    
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;

    @Column()
    @IsInt()
    charID: number;
    
    @Column()
    @IsInt()
    statID: number;
    
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
    @IsOptional()
    modDesc: string;

    @Column()
    @IsDate()
    createdAt: Date;

    @Column()
    @IsDate()
    updatedAt: Date;
}