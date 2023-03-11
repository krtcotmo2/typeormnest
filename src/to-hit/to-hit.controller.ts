import { Controller, Get, Param } from '@nestjs/common';
import { ToHitService } from './to-hit.service';

@Controller('api/to-hit')
export class ToHitController {
    constructor(private toHitService: ToHitService){}

    @Get('/:charId')
    getCharToHits(@Param('charId') charId: string){
        return this.toHitService.getCharToHits(charId);
    }
    
}
