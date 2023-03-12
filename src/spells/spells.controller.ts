import { Controller, Get, Param } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ScrubbedSpellDto } from './dtos/spells-dto';
import { SpellsService } from './spells.service';

@Controller('/api/spells')
export class SpellsController {
    constructor(private spellService: SpellsService){}

    @Serialize(ScrubbedSpellDto)
    @Get('/char/:charId')
    getCharSpells(@Param('charId') charId: string){
        return this.spellService.getCharSpells(charId);
    }

}
