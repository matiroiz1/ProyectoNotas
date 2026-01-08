import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import type { Note } from '../../types';
import { noteService } from '../../services/NoteService';

type NoteCardProps = {
    note: Note;
    onChanged: () => void; // Esta es la función loadNotes que viene del padre
}

function NoteCard({ note, onChanged }: NoteCardProps) {

    const handleArchive = async()=>{
        await noteService.toggleArchive(note.id);
        onChanged();
    }

    const handleDelete = async()=>{
        await noteService.deleteNote(note.id);
        onChanged();
    }
    const handleEdit = async() => {
        await noteService.updateNote(note.id, note);
        onChanged();
    }
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <Button variant="primary" onClick={handleEdit}>Edit</Button>
                <Button variant="secondary" onClick={handleArchive}>
                    {note.archived?'Unarchive':'Archive'}
                </Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default NoteCard;
