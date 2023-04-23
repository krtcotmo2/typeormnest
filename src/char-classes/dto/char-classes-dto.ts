import { Expose } from "class-transformer";

export class CharClassesDTO {
    @Expose()
    classID: number;

    @Expose()
    className: string;

    @Expose()
    classHD: number;

    @Expose()
    toHitBase: number;

    @Expose()
    toHitPercentage: number;

    @Expose()
    toHitOffset: number;
    
    @Expose()
    fortBase: number;

    @Expose()
    fortPercentage: number;

    @Expose()
    fortOffset: number;
    
    @Expose()
    reflexBase: number;

    @Expose()
    reflexPercentage: number;

    @Expose()
    reflexOffset: number;
    
    @Expose()
    willBase: number;

    @Expose()
    willPercentage: number;

    @Expose()
    willOffset: number;
  }