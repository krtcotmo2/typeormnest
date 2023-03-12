import { Controller, Get, Param } from '@nestjs/common';
import { NotesService } from './notes.service';

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
}
