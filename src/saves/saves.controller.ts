import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateSavesDto, UpdateSavesDto } from './dto/saves-dto';
import { SavesService } from './saves.service';
import { map, switchMap } from 'rxjs';
import { CharacterService } from 'src/character/character.service';

@Controller('api/saves')
export class SavesController {
    constructor(
        private savesService: SavesService,
        private characterService: CharacterService,
    ){}

    @Get('/:id')
    getCharSaves (@Param('id') id: string){
       return this.savesService.getCharSaves(+id);
    }

    @Serialize(CreateSavesDto)
    @Post('/:id')
    createCharSaves(@Param('id') id: string, @Body() save: CreateSavesDto){
        return this.savesService.createCharSaves(id, save).pipe(
            switchMap(() => {
              return this.characterService.getCharacterWithStats(
                id,
              );
            }),
            map((char) => JSON.stringify(char)),
        )
    }

    @Delete('/:charId/:id')
    deleteCharSaves (@Param('id') id: string, @Param('charId') charId: string){
       return this.savesService.deleteCharSaves(id).pipe(
            switchMap(() => {
            return this.characterService.getCharacterWithCalcStats(charId);
        }),
        map((char) => JSON.stringify(char) ),
    );
    }

    @Serialize(CreateSavesDto)
    @Put('/:id')
    updateCharSaves(@Param('id') id: string, @Body() save: UpdateSavesDto){
        return this.savesService.updateCharSaves(id, save);
    }
}
