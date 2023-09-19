import { IsDate, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expendables{
    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column()
    @IsNumber()
    charID: number;

    @Column()
    @IsString()
    expType: string;

    @Column()
    @IsString()
    description: string;

    @Column()
    @IsNumber()
    qty: number;
    
    @Column()
    @IsDate()
    createdAt: Date;

    @Column()
    @IsDate()
    updatedAt: Date;
}