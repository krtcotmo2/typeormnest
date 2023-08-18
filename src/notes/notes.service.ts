import { Injectable } from '@nestjs/common';
import { catchError, forkJoin, from, map } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Charnotes } from './char-notes.entity';
import { Noteitems } from './notes.entity';
import { MinimalNoteDto } from './dtos/notes-dto';

@Injectable()
export class NotesService {

    getCharNotes(charId: string){
        return from(AppDataSource.manager.find(
            Charnotes,
            {
                relations:['notes'],
                where: {
                    charID: +charId 
                },
            }
            ))
            .pipe(
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

    createNewNote(note: MinimalNoteDto){
        const theNote: Charnotes = {
            ...note,
            notes:[],
            updatedAt: new Date(),
            createdAt: new Date()
        }
        const newNote  = AppDataSource.manager.create(Charnotes, theNote);
        return from(AppDataSource.manager.save(Charnotes, newNote)).pipe(
            catchError(err =>{
                console.log(err);
                return err;
            }),
        )
    }

    deleteNote(noteId: string){
        return from(AppDataSource.manager.delete(
            Noteitems, 
            {id: noteId}
        ))
    }
}
