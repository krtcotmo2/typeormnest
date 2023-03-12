import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MinimalSpellDto, ScrubbedSpellDto, UpdateSpellDto } from './dtos/spells-dto';
import { SpellsService } from './spells.service';

@Controller('/api/spells')
export class SpellsController {
    constructor(private spellService: SpellsService){}

    @Serialize(ScrubbedSpellDto)
    @Get('/char/:charId')
    getCharSpells(@Param('charId') charId: string){
        return this.spellService.getCharSpells(charId);
    }

    @Serialize(MinimalSpellDto)
    @Put('/:spellId')
    updateCharSpells(
        @Param('spellId') spellId: string, 
        @Body() spell: UpdateSpellDto
    ){
        return this.spellService.updateCharSpells(spellId, spell);
    }

}
