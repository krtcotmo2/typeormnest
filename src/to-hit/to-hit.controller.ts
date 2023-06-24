import { Controller, Get, Param, Put } from '@nestjs/common';
import { ToHitService } from './to-hit.service';

@Controller('api/to-hit')
export class ToHitController {
    constructor(private toHitService: ToHitService){}

    @Get('/:charId')
    getCharToHits(@Param('charId') charId: string){
        return this.toHitService.getCharToHits(charId);
    }
    @Put('/char/:charId/pin/:skillId')
    pinSkill(@Param('skillId') skillId: string, @Param('charId') charId: string){
        return this.toHitService.pinHit(charId, skillId);
    }

    @Put('/char/:charId/unpin/:skillId')
    unpinSkill(@Param('skillId') skillId: string, @Param('charId') charId: string){
        return this.toHitService.unpinHit(charId, skillId);
    }
}
