import { Injectable } from '@nestjs/common';
import { forkJoin, from, map } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Charnotes } from './char-notes';
import { Noteitems } from './notes.entity';

@Injectable()
export class NotesService {

    getCharNotes(charId: string){
        return from(AppDataSource.manager.findBy(
            Charnotes, 
            {charID: +charId}
        )).pipe(
            map( list => {
                return list.sort( (val1, val2) => val1.noteOrder < val2.noteOrder ? -1 : 1)
            })
        );
    }

    getNoteDetails(noteId: string){
       return from(AppDataSource.manager.findBy(
            Noteitems,
            {noteID: +noteId}
        )).pipe(
            map( list => {
                return list.sort( (val1, val2) => val1.itemOrder < val2.itemOrder ? -1 : 1)
            })
        );
    }
}
