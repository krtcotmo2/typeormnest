import { IsBoolean, IsDate, IsDecimal, IsInt, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn, Table } from "typeorm";

@Entity({name: 'classes'})
export class CharClasses{
    public static tableName = 'classes';
    
    @PrimaryColumn()
    classID: number;

    @Column()
    className: string;

    @Column()
    classHD: number;

    @Column()
    toHitBase: number;

    @Column()
    toHitPercentage: number;

    @Column()
    toHitOffset: number;

    @Column()
    fortBase: number;

    @Column()
    fortPercentage: number;

    @Column()
    fortOffset: number;

    
    @Column()
    reflexBase: number;

    @Column()
    reflexPercentage: number;

    @Column()
    reflexOffset: number;

    @Column()
    willBase: number;

    @Column()
    willPercentage: number;

    @Column()
    willOffset: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}