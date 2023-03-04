import { Controller, Get, Param  } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { DefinedStats, StatDto } from './dto/stat-dto';
import { StatService } from './stat.service';

@Controller('/api/stat')
export class StatController {
    constructor(
        private statsService: StatService
    ){}

    @Serialize(DefinedStats)
    @Get('/:charId')
    getCharStats(@Param('charId') charId: string){
        return this.statsService.getCharStats(charId);
     }

    @Serialize(StatDto)
    @Get('/:charId/:id')
    getSingleStat(
        @Param('charId') charId: string,
        @Param('id') id: string,
    ){
        return this.statsService.getSingleStat(charId, id);
    }
}
