import { Controller, Get, Param } from '@nestjs/common';
import { ArmorService } from './armor.service';

@Controller('/api/armor')
export class ArmorController {
    constructor(private armorService: ArmorService){}
    
    @Get('/char/:charId')
    getCharACS(@Param('charId') charId: string){
        return this.armorService.getCharACS(charId);
    }
}
