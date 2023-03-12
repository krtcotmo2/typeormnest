import { Injectable } from '@nestjs/common';
import { from, map, tap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Charspells } from './spells.entity';

@Injectable()
export class SpellsService {

    getCharSpells(charId){
        return from(AppDataSource.manager.findBy(
            Charspells,
            {charID: +charId})).pipe(
                map( (spellList: Charspells[])  => {
                    return spellList.sort(
                        (val1, val2) => {
                            if(val1.spellLevel === val2.spellLevel){
                                return val1.spellName < val2.spellName ? -1 : 1
                            }else{
                                return val1.spellLevel < val2.spellLevel ? -1 : 1
                            }
                        }
                    );
                })
        );
    }
}
