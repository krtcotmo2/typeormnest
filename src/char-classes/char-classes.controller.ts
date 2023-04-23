import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CharClassesService } from './char-classes.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CharClassesDTO } from './dto/char-classes-dto';
import { Observable, switchMap, of } from 'rxjs';

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

}
