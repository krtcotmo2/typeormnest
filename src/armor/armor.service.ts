import { Injectable } from '@nestjs/common';
import { forkJoin, map } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Acs } from './armor.entity';
import { categorizeACS } from './business-logic/armor-helper';
import { Charac } from './char-armor.entity';

@Injectable()
export class ArmorService {

    getCharACS(charId: string){
        const charAcCategory = AppDataSource.manager.findBy(Acs, {charID: +charId});
        const charACSPoints = AppDataSource.manager.findBy( Charac, {charID: +charId});

        return forkJoin([charAcCategory, charACSPoints]).pipe(
            map( ([charAcCategory, charACSPoints]) => {
                return categorizeACS( charAcCategory, charACSPoints);
            })
        );

    }
}
