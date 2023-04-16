import { Injectable } from '@nestjs/common';
import { from, map } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { CharClasses } from 'src/enum/charClasses';
import { updateListWithClassName } from './business-logic/levels-helper';
import { Charlevels } from './levels.entity';

@Injectable()
export class LevelsService {

    getCharLevels(charId:string){
        return from(AppDataSource.manager.findBy(
            Charlevels,
            {charID: +charId}
        )).pipe(
            map( levels => {
                return updateListWithClassName(levels);
            })
        );
    }

    getAllCharLevels(){
        return from(AppDataSource.manager.find(Charlevels)).pipe(
            map( levels => {
                return updateListWithClassName(levels);
            })
        );
    }

}
