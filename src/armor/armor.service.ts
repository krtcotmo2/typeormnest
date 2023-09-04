import { Injectable } from '@nestjs/common';
import { Observable, forkJoin, from, map } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Acs } from './armor.entity';
import { categorizeACS } from './business-logic/armor-helper';
import { Charac } from './char-armor.entity';
import { ArmorGroupCreate, ArmorModLine } from './dto/armor-dto';

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
            pinned: body.pinned,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const a  = AppDataSource.manager.create(Acs, newAcGroup);
        return AppDataSource.manager.save(Acs,a).then(()=>{
            return this.getCharACS(charId.toString());
        })
    }

    updateCharACS(charId: number, body: ArmorModLine[]){
        const arr = body.map((value: ArmorModLine) => {
            const a  = AppDataSource.manager.create(Charac, value);
            return from(AppDataSource.manager.save(Charac,a))
        });
        return from(arr);
    }

    createArmorLine(values: ArmorModLine): Observable<Charac> {
        const a = AppDataSource.manager.create(Charac, values);
        return from(AppDataSource.manager.save(Charac, {
          ...a,
          updatedAt: new Date(),
          createdAt: new Date(),
        }));
      }

    deleteArmorLine(id: string){
        return from(AppDataSource.manager.delete(
          Charac,
          {id: +id},
        ));
      }
    
    pinArmor(charId: string, acId: string){
    return AppDataSource.manager.update(Acs, 
        {
            acID: acId,
            charID: charId
        },
        {
            pinned: true
        }
    )
    }

    unpinArmor(charId: string, acId: string){
    return AppDataSource.manager.update(Acs, 
        {
            acID: acId,
            charID: charId
        },
        {
            pinned: false
        }
    )
    }
}
