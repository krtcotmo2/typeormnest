import { IsBoolean, IsDate, IsDecimal, IsInt, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity({name: 'classes'})
export class CharClasses{
    public static tableName = 'classes';
    
    @PrimaryGeneratedColumn()
    @IsNumber()
    classID: number;

    @Column()
    @IsString()
    className: string;

    @Column()
    @IsNumber()
    classHD: number;

    @Column()
    @IsNumber()
    toHitBase: number;

    @Column()
    @IsNumber()
    toHitPercentage: number;

    @Column()
    @IsNumber()
    toHitOffset: number;

    @Column()
    @IsNumber()
    fortBase: number;

    @Column()
    @IsNumber()
    fortPercentage: number;

    @Column()
    @IsNumber()
    fortOffset: number;

    
    @Column()
    @IsNumber()
    reflexBase: number;

    @Column()
    @IsNumber()
    reflexPercentage: number;

    @Column()
    @IsNumber()
    reflexOffset: number;

    @Column()
    @IsNumber()
    willBase: number;

    @Column()
    @IsNumber()
    willPercentage: number;

    @Column()
    @IsNumber()
    willOffset: number;

    @Column()
    @IsDate()
    createdAt: Date;

    @Column()
    @IsDate()
    updatedAt: Date;
}