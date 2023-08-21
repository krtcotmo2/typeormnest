import { Injectable } from '@nestjs/common';
import { Observable, forkJoin, from, of, switchMap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Tohits } from './hits.entity';
import { Chartohits } from './to-hit.entity';
import { NewToHit, NewToHitCategory, UpdateToHitDto } from './dto/to-hit-dto';

@Injectable()
export class ToHitService {

    getCharToHits(charId: string){
        const toHits = AppDataSource.manager.findBy(Tohits,
          {charID: +charId});
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
                      hitOrder: singleLine.toHitOrder,
                      isMelee: singleLine.isMelee,
                      damage: singleLine.damage,
                      critRange: singleLine.critRange,
                      critDamage: singleLine.critDamage,
                    }
                  })
                .sort((val1, val2) => val1.hitOrder < val2.hitOrder ? -1 : 1);
                return of(definedToHits);
            })
        )
        
    }

    pinHit(charId: string, hitId: string){
        return AppDataSource.manager.update(Chartohits, 
          {
            toHitID: hitId,
            charID: charId
          },
          {
            pinned: true
          }
        )
      }
    
    unpinHit(charId: string, hitId: string){
      return AppDataSource.manager.update(Chartohits, 
        {
          toHitID: hitId,
          charID: charId
        },
        {
          pinned: false
        }
      )
    }

    updateToHitLines(values: UpdateToHitDto[]) {
      const arr = values.map((value: UpdateToHitDto) => {
        return AppDataSource.manager.update(
          Chartohits,
          {id: value.id},
          {
            ...value, 
            updatedAt: new Date()
          });
      });
      return from(arr);
    }

    createToHitLine(values: NewToHit): Observable<Chartohits> {
      const a = AppDataSource.manager.create(Chartohits, values);
      return from(AppDataSource.manager.save(Chartohits, {
        ...a,
        updatedAt: new Date(),
        createdAt: new Date(),
      }));
    }

    createToHitCategory(values: NewToHitCategory): Observable<Tohits> {
      const toHitCat: Tohits = {
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
      } 
      const a = AppDataSource.manager.create(Tohits, values);
      return from(AppDataSource.manager.save(Tohits, a));
    }

    deleteToHitLine(id: string){
      return from(AppDataSource.manager.delete(
        Chartohits,
        {id: +id},
      ));
    }
}
