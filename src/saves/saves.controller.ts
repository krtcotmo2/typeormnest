import { Controller, Get, Param } from '@nestjs/common';
import { SavesService } from './saves.service';

@Controller('api/saves')
export class SavesController {
    constructor(private savesService: SavesService){}

    @Get('/:id')
    getCharSaves (@Param('id') id: string){
       return this.savesService.getCharSaves(+id);
    }
}
