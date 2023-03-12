import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { CharacterService } from 'src/character/character.service';
import { CharWithStats } from 'src/character/dto/character-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import {
  DefinedStats,
  SaveStatDto,
  StatDto,
  UpdateStatDto,
} from './dto/stat-dto';
import { StatService } from './stat.service';

@Controller('/api/stat')
export class StatController {
  constructor(
    private statsService: StatService,
    private characterService: CharacterService,
  ) {}

  @Serialize(StatDto)
  @Get('/:charId')
  getCharStats(@Param('charId') charId: string) {
    return this.statsService.getCharStats(charId);
  }

  @Serialize(StatDto)
  @Get('/:charId/:id')
  getSingleStat(@Param('charId') charId: string, @Param('id') id: string) {
    return this.statsService.getSingleStat(charId, id);
  }

  @Serialize(StatDto)
  @Put('/:charId')
  updateStatLine(
    @Param('charId') charId: string,
    @Body() stat: UpdateStatDto,
  ) {
    return this.statsService.updateStatLine(stat).pipe(
      switchMap(() => {
        return this.characterService.getCharacterWithStats(charId);
      }),
      map((char) => JSON.stringify(char)),
    );
  }

  @Serialize(SaveStatDto)
  @Post('/:charId')
  createStatLine(@Param('charId') charId: string, @Body() stat: SaveStatDto) {
    stat.charID = +charId;
    return this.statsService.createStatLine(stat).pipe(
      switchMap(() => {
        return this.characterService.getCharacterWithStats(
          charId.toString(),
        );
      }),
      map((char) => of(char)),
    );
  }

  @Serialize(StatDto)
  @Delete('/:charId/:id')
  deleteStatLine(@Param('charId') charId: string, @Param('id') id: string) {
    return this.statsService.deleteStatLine(id).pipe(
      switchMap(() => {
        return this.characterService.getCharacterWithStats(charId);
      }),
      map((char) => JSON.stringify(char)),
    );
  }
}
