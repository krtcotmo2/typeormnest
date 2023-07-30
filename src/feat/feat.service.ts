import { Injectable } from '@nestjs/common';
import { forkJoin, map } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Charfeats } from './char-feat.entity';
import { Feats } from './feats.entity';

@Injectable()
export class FeatService {
    getCharFeats(charId:string){
        const allFeats = AppDataSource.manager.find(Feats,{});
        const charFeats = AppDataSource.manager.findBy(
            Charfeats,
            {charID: +charId}
        );

        return forkJoin([charFeats, allFeats]).pipe(
            map( ([charFeats, allFeats]) =>{

                const updatedFeats = charFeats.map(charFeat => {
                    const featDesc = allFeats.find( feat => feat.id === charFeat.featID)
                    return {
                        ...charFeat,
                        desc: {...featDesc}
                    }
                });
                return updatedFeats;
            } )
        )

    }

   async  getFeatsType(){
        const list = await AppDataSource.manager.createQueryBuilder(Feats, 'feats')
        .select('feats.type')
        .distinct(true)
        .orderBy('type')
        .getRawMany()
        
        
        return list.map((arg: {feats_type:string} )=> arg.feats_type);
    }

    async  getFeatsOfType(typeName: string){
        return AppDataSource.manager.findBy(
            Feats,
            {type: typeName}
        );
    }
}
