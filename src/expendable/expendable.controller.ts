import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpdateStatDto } from 'src/stat/dto/stat-dto';
import { UpdateExpendablesDto } from './dto/expendable-dto';
import { ExpendableService } from './expendable.service';

@Controller('/api/expendable')
export class ExpendableController {
    constructor(private expendableService: ExpendableService){}

    @Get('/char/:charId')
    getCharExpendables(@Param('charId') charId: string){
        return this.expendableService.getCharExpendables(charId);
    }

    @Put('/:expId')
    updateCharExpendables(
        @Param('expId') expId: string, 
        @Body() expendable: UpdateExpendablesDto
    ){
        return this.expendableService.updateCharExpendables(expendable, +expId);
    }
}
