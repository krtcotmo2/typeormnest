import { Injectable } from '@nestjs/common';
import { CharClasses } from './char-classes.entity';
import { AppDataSource } from 'src/app-data-source';
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { In } from 'typeorm';

@Injectable()
export class CharClassesService {

    getClassCharts(){
        return from(AppDataSource.manager.find(CharClasses));
    }

    getClassesForLimited(str: string[]){
        return from(AppDataSource.manager.findBy(CharClasses, {
            classID: In(str)
        }));
    }
}
