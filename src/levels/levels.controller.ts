import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { SaveCharLevelDto } from './dto/levels-dto';

@Controller('/api/levels')
export class LevelsController {
    constructor(private levelService: LevelsService){}

    @Get('/char/:charId')
    getCharLevels(@Param('charId') charId: string){
        return this.levelService.getCharLevels(charId);
    }

    @Get('/all')
    getAllCharLevels(){
        return this.levelService.getAllCharLevels();
    }

    @Post('/save')
    SaveCharLevels(@Body() level: SaveCharLevelDto){
        return this.levelService.saveALevel(level);
    }
    @Delete('/delete/:levelId')
    deleteLevel(@Param('levelId') levelId: number){
        return this.levelService.deleteLevel(levelId);
    }
}
