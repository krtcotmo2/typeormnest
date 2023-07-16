import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { DefaultSkill, NewSkill, UpdateSkillDto } from './dto/skills-dto';
import { SkillService } from './skill.service';
import { Charskills } from './skills.entity';
import { UpdateStatDto } from 'src/stat/dto/stat-dto';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { CharacterService } from 'src/character/character.service';

@Controller('/api/skill')
export class SkillController {
    constructor(
        private skillService: SkillService,
        private characterService: CharacterService,
    ){}

    //@Serialize(DefaultSkill)
    @Get('/char/:charId')
    getCharSkills(@Param('charId') charId: string){
        return this.skillService.getCharSkills(charId);
    }
    
    @Put('/char/:charId/pin/:skillId')
    pinSkill(@Param('skillId') skillId: string, @Param('charId') charId: string){
        return this.skillService.pinSkill(charId, skillId);
    }

    @Put('/char/:charId/unpin/:skillId')
    unpinSkill(@Param('skillId') skillId: string, @Param('charId') charId: string){
        return this.skillService.unpinSkill(charId, skillId);
    }

    @Put('/updates/:charId')
    UpdateSkillLines(@Body() skills: UpdateSkillDto[], @Param('charId') charId: string){
        return this.skillService.updateSkillLines(skills).pipe(
            switchMap(() => {
              return this.characterService.getCharacterWithStats(charId);
            }),
            map((char) => JSON.stringify(char) ),
          );
    }

    @Post('/:charId')
    saveSkillLines(@Body() skills: NewSkill, @Param('charId') charId: string){
        return this.skillService.createSkillLine(skills).pipe(
            switchMap(() => {
              return this.characterService.getCharacterWithStats(charId);
            }),
            map((char) => JSON.stringify(char) ),
          );
    }
    
    @Serialize(DefaultSkill)
    @Delete('/:charId/:id')
    deleteStatLine(@Param('charId') charId: string, @Param('id') id: string) {
        return this.skillService.deleteSkillLine(id).pipe(
        switchMap(() => {
            return this.characterService.getCharacterWithStats(charId);
        }),
        map((char) => JSON.stringify(char) ),
        );
  }
}
