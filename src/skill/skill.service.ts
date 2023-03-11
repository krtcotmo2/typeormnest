import { Injectable } from '@nestjs/common';
import { forkJoin, from, map, switchMap, of } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Skills } from './defaultSkills.entity';
import { Charskills } from './skills.entity';

@Injectable()
export class SkillService {

  getCharSkills(charId: string) {
    const charSkill = AppDataSource.manager.findBy(Charskills, {charID: +charId,})
    const skill = AppDataSource.manager.find(Skills, {});
    return forkJoin([charSkill, skill]).pipe(
      switchMap( ([charSkill, skill]) => {
        const allSkills =  charSkill.map( cSkill => {
          return {
            ...cSkill,
            skillName: skill.find(skill => skill.skillID === cSkill.skillID).skillName
          }
        })
        .sort((val1, val2) => val1.skillID < val2.skillID ? -1 : 1);
       return of(allSkills);
      }),
      
    );
  }
}
