import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/app-data-source';
import { Charsaves } from './saves.entity';

@Injectable()
export class SavesService {

    async getCharSaves(id :number){
        return await AppDataSource.manager.findBy(Charsaves, {charID: id})
    }
}
