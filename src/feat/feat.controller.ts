import { Controller, Get, Param } from '@nestjs/common';
import { FeatService } from './feat.service';

@Controller('api/feat')
export class FeatController {
    constructor(private featService: FeatService){}

    @Get('/char/:charId')
    getCharFeats(@Param('charId') charId: string){
        return this.featService.getCharFeats(charId);
    }
}
