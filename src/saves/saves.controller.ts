import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateSavesDto, UpdateSavesDto } from './dto/saves-dto';
import { Charsaves } from './saves.entity';
import { SavesService } from './saves.service';

@Controller('api/saves')
export class SavesController {
    constructor(private savesService: SavesService){}

    @Get('/:id')
    getCharSaves (@Param('id') id: string){
       return this.savesService.getCharSaves(+id);
    }

    @Serialize(CreateSavesDto)
    @Post('/:id')
    createCharSaves(@Param('id') id: string, @Body() save: CreateSavesDto){
        return this.savesService.createCharSaves(id, save);
    }

    @Delete('/:charId/:id')
    deleteCharSaves (@Param('id') id: string){
       return this.savesService.deleteCharSaves(id);
    }

    @Serialize(CreateSavesDto)
    @Put('/:id')
    updateCharSaves(@Param('id') id: string, @Body() save: UpdateSavesDto){
        return this.savesService.updateCharSaves(id, save);
    }
}
