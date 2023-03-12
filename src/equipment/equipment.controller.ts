import { Controller, Get, Param } from '@nestjs/common';
import { EquipmentService } from './equipment.service';

@Controller('/api/equipment')
export class EquipmentController {
constructor(private equipService: EquipmentService){}

    @Get('/char/:charId')
    getCharEquipment(@Param('charId') charId: string){
        return this.equipService.getCharEquipment(charId)
    }

}
