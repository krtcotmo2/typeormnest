import { Injectable } from '@nestjs/common';
import { forkJoin, from, map, switchMap, of } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Skills } from './defaultSkills.entity';
import { Charskills } from './skills.entity';
import { UpdateStatDto } from 'src/stat/dto/stat-dto';
import { UpdateSkillDto } from './dto/skills-dto';

@Injectable()
export class SkillService {

  getCharSkills(charId: string) {
    const charSkill = AppDataSource.manager.find(Charskills, {
      where: [{charID: +charId,}],
      order: {
        skillID: 'DESC',

      }
      
    })
    const skill = AppDataSource.manager.find(Skills, {});
    return forkJoin([charSkill, skill]).pipe(
      switchMap( ([charSkill, skill]) => {
        const allSkills =  charSkill.map( cSkill => {
          return {
            ...cSkill,
            skillName: skill.find(skill => skill.skillID === cSkill.skillID).skillName
          }
        })
        .sort((val1, val2) => val1.skillName < val2.skillName ? -1 : 1);
       return of(allSkills);
      }),
      
    );
  }

  getCharPinnedSkills(charId: string) {
    const charSkill = AppDataSource.manager.find(Charskills, {
      where: [{charID: +charId, pinned: true}],
      order: {
        skillID: 'DESC',

      }
      
    })
    const skill = AppDataSource.manager.find(Skills, {});
    return forkJoin([charSkill, skill]).pipe(
      switchMap( ([charSkill, skill]) => {
        const allSkills =  charSkill.map( cSkill => {
          return {
            ...cSkill,
            skillName: skill.find(skill => skill.skillID === cSkill.skillID).skillName
          }
        })
        .sort((val1, val2) => val1.skillName < val2.skillName ? -1 : 1);
       return of(allSkills);
      }),
      
    );
  }

  pinSkill(charId: string, skillId: string){
    return AppDataSource.manager.update(Charskills, 
      {
        skillID: skillId,
        charID: charId
      },
      {
        pinned: true
      }
    )
  }

  unpinSkill(charId: string, skillId: string){
    return AppDataSource.manager.update(Charskills, 
      {
        skillID: skillId,
        charID: charId
      },
      {
        pinned: false
      }
    )
  }

  updateSkillLines(values: UpdateSkillDto[]) {
    const arr = values.map((value: UpdateSkillDto) => {
      return AppDataSource.manager.update(
        Charskills,
        {id: value.id},
        {
          ...value, 
          updatedAt: new Date()
        });
    });
    return from(arr);
  }
}
