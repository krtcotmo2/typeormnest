import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { CreateSavesDto, UpdateSavesDto } from './dto/saves-dto';
import { Charsaves } from './saves.entity';
import { CharacterService } from 'src/character/character.service';

@Injectable()
export class SavesService {
    constructor(
        @Inject(forwardRef(() => CharacterService))
       private charService: CharacterService,
    ){}

    getCharSaves(id :number){
        return from(AppDataSource.manager.findBy(Charsaves, {charID: id}))
    }

    createCharSaves(charId: string, saveData: CreateSavesDto){
        saveData.charID = +charId;
        saveData.createdAt = new Date();
        saveData.updatedAt = new Date();
        const a  = AppDataSource.manager.create(Charsaves, saveData);
        return from(AppDataSource.manager.save(Charsaves,a))
    }

    updateCharSaves(charId: string, saveData: UpdateSavesDto){
        return from(AppDataSource.manager.update(
            Charsaves,
            {id: saveData.id},
            {
              ...saveData, 
              updatedAt: new Date()
            }));
    }

    updateAllCharSaves(values: UpdateSavesDto[]) {
        const arr = values.map((saveData: UpdateSavesDto) => {
          return AppDataSource.manager.update(
            Charsaves,
            {id: saveData.id},
            {
              ...saveData, 
              updatedAt: new Date()
            });
        });
        return from(arr);
      }

    deleteCharSaves(saveId: string){
        return from(AppDataSource.manager.delete(Charsaves, {id: saveId}));
    }



}
