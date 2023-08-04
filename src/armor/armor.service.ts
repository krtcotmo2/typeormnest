import { Injectable } from '@nestjs/common';
import { forkJoin, from, map } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Acs } from './armor.entity';
import { categorizeACS } from './business-logic/armor-helper';
import { Charac } from './char-armor.entity';
import { ArmorGroupCreate } from './dto/armor-dto';

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

    createCharACS(charId: number, body: ArmorGroupCreate){
        const newAcGroup: Acs = {
            acID: 0,
            acDesc: body.acDesc,
            charID: body.charID,
            sortValue: body.sortValue,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const a  = AppDataSource.manager.create(Acs, newAcGroup);
        return from(AppDataSource.manager.save(Acs,a))
    }
}
