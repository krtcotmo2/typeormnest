import { Injectable } from '@nestjs/common';
import { catchError, from, map } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { CreateSavesDto, UpdateSavesDto } from './dto/saves-dto';
import { Charsaves } from './saves.entity';

@Injectable()
export class SavesService {

    getCharSaves(id :number){
        return from(AppDataSource.manager.findBy(Charsaves, {charID: id}))
    }

    createCharSaves(charId: string, saveData: CreateSavesDto){
        saveData.charID = +charId;
        saveData.createdAt = new Date();
        saveData.updatedAt = new Date()
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

    deleteCharSaves(saveId: string){
        return from(AppDataSource.manager.delete(Charsaves, {id: saveId}));
    }



}
