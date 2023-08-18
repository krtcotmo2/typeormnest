import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { switchMap } from 'rxjs';
import { Charnotes } from './char-notes.entity';
import { MinimalNoteDto } from './dtos/notes-dto';

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

    @Delete('/:noteId/:charId')
    deleteNote(@Param('noteId') noteId: string, @Param('charId') charId: string){
        return this.noteService.deleteNote(noteId).pipe(
            switchMap(()=> {
                return this.getCharNotes(charId)
            })
        );
    }
}


