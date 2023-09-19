import { Injectable } from '@nestjs/common';
import { Observable, catchError, forkJoin, from, map } from 'rxjs';
import { AppDataSource } from 'src/app-data-source';
import { Charnotes } from './char-notes.entity';
import { Noteitems } from './notes.entity';
import { MinimalNoteDto, NoteItemDto } from './dtos/notes-dto';

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

    createNewNoteItem(note: NoteItemDto){
        const theNote: Noteitems = {
            ...note,
            updatedAt: new Date(),
            createdAt: new Date()
        }
        const newNoteItem  = AppDataSource.manager.create(Noteitems, theNote);
        return from(AppDataSource.manager.save(Noteitems, newNoteItem)).pipe(
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

    updateNotes(notes: NoteItemDto[]){
        return from(new Promise( async (resolve, reject) => {
            try{
                await notes.forEach(async note => {
                    const n: Noteitems = {
                        id: note.id,
                        itemOrder: note.itemOrder,
                        itemDetails: note.itemDetails,
                        createdAt: note.createdAt,
                        updatedAt: note.updatedAt,
                        noteID: note.noteID
                    }
                    AppDataSource.manager.update(
                        Noteitems,
                        {id: note.id},
                        {
                            ...n,
                            updatedAt: new Date()
                        }
                    )
                });
                resolve('saved');
            }catch(err){
                console.log(err);
                reject(new Error( 'not happening'))
            }
        }));
    }
}
