import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MinimalSpellDto, ScrubbedSpellDto, UpdateSpellDto } from './dtos/spells-dto';
import { SpellsService } from './spells.service';
import { from, map, of } from 'rxjs';

@Controller('/api/spells')
export class SpellsController {
    constructor(private spellService: SpellsService){}

    @Serialize(ScrubbedSpellDto)
    @Get('/char/:charId')
    getCharSpells(@Param('charId') charId: string){
        return this.spellService.getCharSpells(charId).pipe(
            map(data => data)
        );
    }

    @Serialize(MinimalSpellDto)
    @Put('/:spellId')
    updateCharSpells(
        @Param('spellId') spellId: string, 
        @Body() spell: UpdateSpellDto
    ){
        return this.spellService.updateCharSpells(spellId, spell);
    }


    @Serialize(MinimalSpellDto)
    @Delete('/:spellId')
    deleteCharSpells(
        @Param('spellId') spellId: string,
    ){
        return this.spellService.deleteCharSpells(spellId);
    }

    @Serialize(UpdateSpellDto)
    @Post('/char/:charId')
    createCharSpells(
        @Param('charId') charId: string, 
        @Body() spell: UpdateSpellDto
    ){
        return this.spellService.createCharSpells(charId, spell);
    }

}
