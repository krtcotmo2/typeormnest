import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn, Table } from "typeorm";

@Entity({name: 'classes'})
export class CharClasses{
    public static tableName = 'classes';
    
    @PrimaryColumn()
    @IsInt()
    classID: number;

    @Column()
    @IsString()
    className: string;

    @Column()
    @IsInt()
    classHD: number;

    @Column()
    @IsInt()
    toHitBase: number;

    @Column()
    @IsInt()
    toHitPercentage: number;

    @Column()
    @IsInt()
    toHitOffset: number;

    @Column()
    @IsInt()
    fortBase: number;

    @Column()
    @IsInt()
    fortPercentage: number;

    @Column()
    @IsInt()
    fortOffset: number;

    
    @Column()
    @IsInt()
    reflexBase: number;

    @Column()
    @IsInt()
    reflexPercentage: number;

    @Column()
    @IsInt()
    reflexOffset: number;

    @Column()
    @IsInt()
    willBase: number;

    @Column()
    @IsInt()
    willPercentage: number;

    @Column()
    @IsInt()
    willOffset: number;

    @Column()
    @IsDate()
    createdAt: Date;

    @Column()
    @IsDate()
    updatedAt: Date;
}