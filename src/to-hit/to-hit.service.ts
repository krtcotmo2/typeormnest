import { Injectable } from '@nestjs/common';
import { forkJoin, of, switchMap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Tohits } from './hits.entity';
import { Chartohits } from './to-hit.entity';

@Injectable()
export class ToHitService {

    getCharToHits(charId: string){
        const toHits = AppDataSource.manager.find(Tohits);
        const charToHits =  AppDataSource.manager.findBy(
            Chartohits, 
            {charID: +charId}
        );

        return forkJoin([charToHits, toHits]).pipe(
            switchMap( ([charToHits, toHits]) => {
                const definedToHits =  charToHits.map( tohit => {
                    const singleLine = toHits.find(hit => hit.toHitID === tohit.toHitID);
                    return {
                      ...tohit,
                      hitName: singleLine.toHitDesc,
                      hitOrder: singleLine.toHitOrder
                    }
                  })
                .sort((val1, val2) => val1.hitOrder < val2.hitOrder ? -1 : 1);
                return of(definedToHits);
            })
        )
        
    }
}
