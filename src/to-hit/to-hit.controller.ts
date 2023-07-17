import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ToHitService } from './to-hit.service';
import { Tohits } from './hits.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { map, switchMap } from 'rxjs';
import { CharacterService } from 'src/character/character.service';
import { NewToHit, UpdateToHitDto } from './dto/to-hit-dto';

@Controller('api/to-hit')
export class ToHitController {
    constructor(
        private toHitService: ToHitService,
        private characterService: CharacterService,
    ){}

    @Get('/:charId')
    getCharToHits(@Param('charId') charId: string){
        return this.toHitService.getCharToHits(charId);
    }
    @Put('/char/:charId/pin/:skillId')
    pinToHit(@Param('skillId') skillId: string, @Param('charId') charId: string){
        return this.toHitService.pinHit(charId, skillId);
    }

    @Put('/char/:charId/unpin/:skillId')
    unpinToHit(@Param('skillId') skillId: string, @Param('charId') charId: string){
        return this.toHitService.unpinHit(charId, skillId);
    }

    @Put('/updates/:charId')
    UpdateToHitLines(@Body() tohits: UpdateToHitDto[], @Param('charId') charId: string){
        return this.toHitService.updateToHitLines(tohits).pipe(
            switchMap(() => {
              return this.characterService.getCharacterWithStats(charId);
            }),
            map((char) => JSON.stringify(char) ),
          );
    }

    @Post('/:charId')
    saveSkillLines(@Body() toHit: NewToHit, @Param('charId') charId: string){
        return this.toHitService.createToHitLine(toHit).pipe(
            switchMap(() => {
              return this.characterService.getCharacterWithStats(charId);
            }),
            map((char) => JSON.stringify(char) ),
          );
    }
    
    @Serialize(Tohits)
    @Delete('/:charId/:id')
    deleteStatLine(@Param('charId') charId: string, @Param('id') id: string) {
        return this.toHitService.deleteToHitLine(id).pipe(
        switchMap(() => {
            return this.characterService.getCharacterWithStats(charId);
        }),
        map((char) => JSON.stringify(char) ),
        );
    }
}
