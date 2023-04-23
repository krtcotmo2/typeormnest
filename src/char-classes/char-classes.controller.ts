import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CharClassesService } from './char-classes.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CharClassesDTO } from './dto/char-classes-dto';
import { Observable, switchMap, of } from 'rxjs';
import { CharClasses } from './char-classes.entity';

@Controller('api/char-classes')
export class CharClassesController {
    constructor(private charClassesService: CharClassesService){}

    @Serialize(CharClassesDTO) 
    @Get('/?')
    getClassesForLimited(@Query('arr') query){
        if(query){
            return this.charClassesService.getClassesForLimited(query);
        }
        return this.charClassesService.getClassCharts();
    }

    @Get('/:classID/:level')
    getStatsForClass(@Param('classID') classID: string, @Param('level') level:string){
        return this.charClassesService.getClassesForLimited(classID).pipe(
            switchMap((stats: CharClassesDTO[]) => {
                return of(
                    stats.map((stat, i) => {
                        const lvl = level.split(',')[i];
                        const curClassID = classID.split(',')[i];
                        const cls = stats.find( cl => cl.classID === +curClassID);
                        return {
                            class: cls.className,
                            level: +lvl,
                            toHit: Math.ceil(
                                cls.toHitBase + ((cls.toHitPercentage/100) * (+lvl - cls.toHitOffset))
                            ),
                            fort: Math.ceil(
                                cls.fortBase + ((cls.fortPercentage/100) * (+lvl  - cls.fortOffset))
                            ),
                            reflex: Math.ceil(
                                cls.reflexBase + ((cls.reflexPercentage/100) * (+lvl  - cls.reflexOffset))
                            ),
                            will: Math.ceil(
                                cls.willBase + ((cls.willPercentage/100) * (+lvl  - cls.willOffset))
                            )
                        }
                    })
                    
                )
            })
        );
    }

}
