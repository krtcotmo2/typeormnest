import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Charnotes } from './char-notes.entity';
import { MinimalNoteDto, NoteItemDto } from './dtos/notes-dto';

@Controller('/api/notes')
export class NotesController {
    constructor(private noteService: NotesService){}

    @Get('/char/:charId')
    getCharNotes(@Param('charId') charId: string){
        return this.noteService.getCharNotes(charId);
    }

    @Get('/note/:noteId')
    getNoteDetails(@Param('noteId') noteId: string){
        return this.noteService.getNoteDetails(noteId);
    }

    @Post('/note/:charId')
    createNewNote(@Body() note: MinimalNoteDto, @Param('charId') charId: string){
        return this.noteService.createNewNote(note).pipe(
            switchMap(()=> {
                return this.getCharNotes(charId)
            })
        );
    }

    @Post('/noteItem/:charId')
    createNewNoteItem(@Body() note: NoteItemDto, @Param('charId') charId: string){
        return this.noteService.createNewNoteItem(note).pipe(
            switchMap(()=> {
                return this.getNoteDetails(note.noteID.toString())
            })
        );
    }

    @Put('/note/:charId')
    updateNote(@Body() note: NoteItemDto[], @Param('charId') charId: string){
        return this.noteService.updateNotes(note).pipe(
            catchError(arg => {
                throw new HttpException(arg.message, HttpStatus.BAD_REQUEST);
            }),
        );
    }

    @Delete('/:noteId/:charId')
    deleteNote(@Param('noteId') noteId: string, @Param('charId') charId: string){
        return this.noteService.deleteNote(noteId).pipe(
            switchMap(()=> {
                return this.getCharNotes(charId)
            })
        );
    }
}


