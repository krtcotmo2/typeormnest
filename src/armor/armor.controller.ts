import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArmorService } from './armor.service';
import { Acs } from './armor.entity';
import { ArmorGroupCreate, ArmorModLine } from './dto/armor-dto';
import { map, switchMap } from 'rxjs';
import { CharacterService } from 'src/character/character.service';

@Controller('/api/armor')
export class ArmorController {
    constructor(
        private armorService: ArmorService,
        private characterService: CharacterService,
    ){}
    
    @Get('/char/:charId')
    getCharACS(@Param('charId') charId: string){
        return this.armorService.getCharACS(charId);
    }

    @Post('/char/:charId')
    createCharACS( @Body() body: ArmorGroupCreate ){
        return this.armorService.createCharACS(body.charID, body);
    }

    @Put('/updates/:charId')
    updateCharACS(@Param('charId') charId: string,  @Body() body: ArmorModLine[] ){
        return this.armorService.updateCharACS(+charId, body);
    }

    @Post('/:charId')
    saveArmorLines(@Body() armor: ArmorModLine, @Param('charId') charId: string){
        return this.armorService.createArmorLine(armor).pipe(
            switchMap(() => {
              return this.characterService.getCharacterWithStats(charId);
            }),
            map((char) => JSON.stringify(char) ),
          );
    }

    @Delete('/:charId/:acID')
    deleteArmorLines(@Param('charId') charId: string, @Param('acID') acID: string){
        return this.armorService.deleteArmorLine(acID).pipe(
            switchMap(() => {
              return this.characterService.getCharacterWithStats(charId);
            }),
            map((char) => JSON.stringify(char) ),
          );
    }

    @Put('/char/:charId/pin/:acId')
    pinSkill(@Param('acId') acId: string, @Param('charId') charId: string){
        return this.armorService.pinArmor(charId, acId);
    }

    @Put('/char/:charId/unpin/:acId')
    unpinSkill(@Param('acId') acId: string, @Param('charId') charId: string){
        return this.armorService.unpinArmor(charId, acId);
    }
}
