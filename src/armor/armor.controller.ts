import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArmorService } from './armor.service';
import { Acs } from './armor.entity';
import { ArmorGroupCreate } from './dto/armor-dto';

@Controller('/api/armor')
export class ArmorController {
    constructor(private armorService: ArmorService){}
    
    @Get('/char/:charId')
    getCharACS(@Param('charId') charId: string){
        return this.armorService.getCharACS(charId);
    }

    @Post('/char/:charId')
    createCharACS( @Body() body: ArmorGroupCreate ){
        return this.armorService.createCharACS(body.charID, body);
    }
}
