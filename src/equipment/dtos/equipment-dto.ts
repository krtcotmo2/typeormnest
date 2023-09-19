import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { DefinedStats } from "src/stat/dto/stat-dto";
import { DefinedSaves } from "src/saves/dto/saves-dto";

export class DefaultEquipmentDto {
}

export class SaveEquipmentDto {
    id: number;
    charID: number;
    equip: string;
    weight: number;
    equipOrder: number;
    partOfOverallWeight: boolean;
    location?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UpdateEquipmentDto {
    id: number;
    charID: number;
    equip: string;
    weight: number;
    equipOrder: number;
    partOfOverallWeight: boolean;
    location?: string;
    createdAt?: Date;
    updatedAt?: Date;
}