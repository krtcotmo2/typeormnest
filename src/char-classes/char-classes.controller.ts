import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CharClassesService } from './char-classes.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CharClassesDTO } from './dto/char-classes-dto';
import { Observable, switchMap, of } from 'rxjs';
import { CharClasses } from './char-classes.entity';
import { calcSavesAndHitsForEachClass } from './transformers/transform-char-class-data';

@Controller('api/char-classes')
export class CharClassesController {
    constructor(private charClassesService: CharClassesService){}

    @Serialize(CharClassesDTO) 
    @Get('/?')
    getClassesForLimited(@Query('arr') query){
        if(query){
            const qArray = query.split(',');
            return this.charClassesService.getClassesForLimited(qArray);
        }
        return this.charClassesService.getClassCharts();
    }

    @Get('/:classID/:level')
    getStatsForClass(@Param('classID') classID: string, @Param('level') level:string){
        const cArray = classID.split(',');
        return this.charClassesService.getClassesForLimited(cArray).pipe(
            switchMap((stats: CharClassesDTO[]) => {
                const transformedStats = calcSavesAndHitsForEachClass(
                    stats, 
                    classID.split(','),
                    level.split(','),
                    []
                );
                return of(transformedStats)
            })
        );
    }

}
