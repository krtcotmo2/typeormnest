import { StatType } from 'src/enum/stat-type';
import { getValues } from 'src/stat/business-logic/stat-helper';
import { DefinedSaves } from '../dto/saves-dto';
import { Charsaves } from '../saves.entity';

export const buildCharSaves = (saves: Charsaves[]): DefinedSaves => {
    const definedSaves = new DefinedSaves();
    definedSaves.fortitude = getValues(
      saves.filter((stat) => stat.saveID === 1),
    );
    definedSaves.reflex = getValues(
      saves.filter((stat) => stat.saveID === 2),
    );
    definedSaves.will = getValues(
      saves.filter((stat) => stat.saveID === 3),
    );
    return definedSaves;
}
