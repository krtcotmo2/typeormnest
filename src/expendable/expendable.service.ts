import { Injectable } from '@nestjs/common';
import { from, map } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Expendables } from './expendable.entity';

@Injectable()
export class ExpendableService {
    getCharExpendables(charId: string){
        return from(AppDataSource.manager.findBy(
            Expendables,
            {charID: +charId}
        )).pipe(
            map( expList => {
                return expList.sort( (val1, val2) =>{
                    if(val1.expType === val2.expType){
                        return val1.description < val2.description ? -1 : 1;
                    }else{
                        return val1.expType < val2.expType ? -1 : 1;
                    }
                })
            })
        );
    }
}
