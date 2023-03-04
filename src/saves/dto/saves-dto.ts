import { Expose } from "class-transformer";
import { StatType } from "src/enum/stat-type";

export class DefinedSaves {
    @Expose()
    fortitude: {
      value: number;
      breakdown: {
        id: number;
        score: number;
        type: StatType;
        modDesc: string;
      }[];
    };
    @Expose()
    reflex: {
      value: number;
      breakdown: {
        id: number;
        score: number;
        type: StatType;
        modDesc: string;
      }[];
    };
    @Expose()
    will: {
      value: number;
      breakdown: {
        id: number;
        score: number;
        type: StatType;
        modDesc: string;
      }[];
    };
  }
