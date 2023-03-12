import { Controller, Get, Param } from '@nestjs/common';
import { LevelsService } from './levels.service';

@Controller('/api/levels')
export class LevelsController {
    constructor(private levelService: LevelsService){}

    @Get('/char/:charId')
    getCharLevels(@Param('charId') charId: string){
        return this.levelService.getCharLevels(charId);
    }
}
