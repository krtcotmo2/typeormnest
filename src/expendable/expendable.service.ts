import { Injectable } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { UpdateExpendablesDto } from './dto/expendable-dto';
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

    updateCharExpendables(expendable: UpdateExpendablesDto, expId: number){
        return from(AppDataSource.manager.update(
            Expendables,
            {id: expId},
            {
                ...expendable,
                updatedAt: new Date()
            }
        )).pipe(
            switchMap(()=> {
               return this.getSingleExpendables(expId.toString());
            },
            )
        );
    }

    private getSingleExpendables(expId: string){
        return from(AppDataSource.manager.findBy(
            Expendables,
            {id: +expId}
        ));
    }
}
