import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { SaveEquipmentDto, UpdateEquipmentDto } from './dtos/equipment-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { from, map, of, switchMap } from 'rxjs';

@Controller('/api/equipment')
export class EquipmentController {
constructor(private equipService: EquipmentService){}

    @Get('/:charId')
    getCharEquipment(@Param('charId') charId: string){
        return this.equipService.getCharEquipment(charId)
    }

    @Serialize(SaveEquipmentDto)
    @Post('/char/:charId')
    async createCharEquipment(
        @Param('charId') charId: string, 
        @Body() equipmentItem
    ){
        return await this.equipService.createCharEquipment(equipmentItem)
            .then(async arg => {
                return await this.getCharEquipment(charId);
            }).then(arg => {
                return JSON.stringify(arg);
            }
        )
        
    }

    @Serialize(UpdateEquipmentDto)
    @Put('/:equipId')
    updateCharEquipment(
        @Body() equipmentItem
    ){
        return from(this.equipService.updateCharEquipment(equipmentItem)).pipe(
            switchMap(
                async ()=>{
                    return await this.getCharEquipment(equipmentItem.charID.toString())
                        .then(arg => {
                            return JSON.stringify(arg);
                        })
                }
            )
        )  
    }

    @Serialize(UpdateEquipmentDto)
    @Delete('/:charId/:equipId')
    deleteCharEquipment(
        @Param('charId') charId: string,
        @Param('equipId') equipId: string
    ){
        return from(this.equipService.deleteCharEquipment(equipId));
    }

}
