import { Injectable } from '@nestjs/common';
import { from, map, of, switchMap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Charequip } from './char-equip.entity';

@Injectable()
export class EquipmentService {

    getCharEquipment(charId: string){
        const val = AppDataSource.manager.findBy(Charequip, {charID: +charId})
            .then(equipList => {
                return {
                    items: [...equipList],
                    weight: equipList.reduce( (startingV, item) => startingV + item.weight, 0),
                }
            });
        return of(val);
    }
}
