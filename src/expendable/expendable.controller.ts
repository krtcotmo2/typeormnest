import { Controller, Get, Param } from '@nestjs/common';
import { ExpendableService } from './expendable.service';

@Controller('/api/expendable')
export class ExpendableController {
    constructor(private expendableService: ExpendableService){}

    @Get('/char/:charId')
    getCharExpendables(@Param('charId') charId: string){
        return this.expendableService.getCharExpendables(charId);
    }
}
