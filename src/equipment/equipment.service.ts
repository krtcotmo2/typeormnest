import { BadRequestException, Injectable } from '@nestjs/common';
import { from, map, of, switchMap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Charequip } from './char-equip.entity';
import { SaveEquipmentDto, UpdateEquipmentDto } from './dtos/equipment-dto';

@Injectable()
export class EquipmentService {

    async getCharEquipment(charId: string){
        const val = await AppDataSource.manager.findBy(Charequip, {charID: +charId})
            .then(equipList => {
                return {
                    items: [...equipList],
                    weight: equipList.reduce( (startingV, item) => startingV + (item.partOfOverallWeight ? item.weight : 0.00) , 0.00),
                }
            });
        return val;
    }

    async createCharEquipment(item: SaveEquipmentDto){
        item.updatedAt = new Date();
        item.createdAt = new Date();
        const a  = AppDataSource.manager.create(Charequip, item);
        return AppDataSource.manager.save(Charequip, a);
    }

    async updateCharEquipment(item: UpdateEquipmentDto){
        item.updatedAt = new Date();
        return AppDataSource.manager.update(Charequip, 
            {id: item.id},
            item)
            .catch(err =>  {throw new BadRequestException('Item not updated')})
    }

    async deleteCharEquipment(id: string){
        return from(AppDataSource.manager.delete(Charequip, {id: id}));
    }
}
