import { StatType } from 'src/enum/stat-type';
import { getValues } from 'src/stat/business-logic/stat-helper';
import { DefinedSaves } from '../dto/saves-dto';
import { Charsaves } from '../saves.entity';
import { DefinedStats } from 'src/stat/dto/stat-dto';
import { SaveType } from 'src/enum/save-type';

export const calcSaves = (
  levelStats,
  stats: DefinedStats,
  saves: Charsaves[],
): DefinedSaves => {
  const definedSaves = new DefinedSaves();
  definedSaves.fortitude = getValues(saves.filter((stat) => stat.saveID === 1));
  definedSaves.reflex = getValues(saves.filter((stat) => stat.saveID === 2));
  definedSaves.will = getValues(saves.filter((stat) => stat.saveID === 3));

  adjustSingleDefinedSave(SaveType.FORTITUDE, definedSaves, levelStats, stats);
  adjustSingleDefinedSave(SaveType.REFLEX, definedSaves, levelStats, stats);
  adjustSingleDefinedSave(SaveType.WILL, definedSaves, levelStats, stats);
  return definedSaves;
};

export const adjustSingleDefinedSave = (
  saveType: SaveType,
  saves: DefinedSaves,
  levelStats,
  charStat,
) => {
  let theSave, levelBonus, statBonus, statDesc;
  switch (saveType) {
    case SaveType.FORTITUDE:
      theSave = saves.fortitude;
      levelBonus = levelStats.reduce((origin, save) => origin + save.fort, 0);
      statBonus = Math.floor((charStat.con.value - 10) / 2);
      statDesc = 'Con';
      break;
    case SaveType.REFLEX:
      theSave = saves.reflex;
      levelBonus = levelStats.reduce((origin, save) => origin + save.reflex, 0);
      statBonus = Math.floor((charStat.dex.value - 10) / 2);
      statDesc = 'Dex';
      break;
    case SaveType.WILL:
      theSave = saves.will;
      levelBonus = levelStats.reduce((origin, save) => origin + save.will, 0);
      statBonus = Math.floor((charStat.wis.value - 10) / 2);
      statDesc = 'Wis';
      break;
    default:
      throw new Error('save type not specified');
  }
  theSave.value += levelBonus + statBonus;
  levelStats.map((lvl) => {
    theSave.breakdown.push({
      id: 0,
      score:
        saveType === SaveType.FORTITUDE
          ? lvl.fort
          : saveType === SaveType.REFLEX
          ? lvl.reflex
          : lvl.will,
      type: StatType.BASE,
      modDesc: `${lvl.class} stat`,
    });
  });
  theSave.breakdown.push({
    id: 0,
    score: statBonus,
    type: StatType.BASE,
    modDesc: statDesc + ' Bonus',
  });
  theSave.breakdown.sort((item1, item2) => {
    return item1.id < item2.id ? -1 : 1;
  });
};
