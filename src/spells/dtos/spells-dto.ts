import { Expose } from "class-transformer";

export class ScrubbedSpellDto{
    @Expose()
    id: number;
    
    @Expose()
    charID: number;

    @Expose()
    spellLevel: number;

    @Expose()
    spellName: string;

    @Expose()
    isCast: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
  }