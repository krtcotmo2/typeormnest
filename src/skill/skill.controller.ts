import { Controller, Get, Param } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { DefaultSkill } from './dto/skills-dto';
import { SkillService } from './skill.service';
import { Charskills } from './skills.entity';

@Controller('/api/skill')
export class SkillController {
    constructor(
        private skillService: SkillService
    ){}

    //@Serialize(DefaultSkill)
    @Get('/char/:charId')
    getCharSkills(@Param('charId') charId: string){
        return this.skillService.getCharSkills(charId);
    }

}
