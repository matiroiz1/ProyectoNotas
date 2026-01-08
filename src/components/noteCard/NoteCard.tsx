import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import type { Note } from '../../types';
import { noteService } from '../../services/NoteService';

type NoteCardProps = {
    note: Note;
    onChanged: () => void; // el padre recarga la lista
};

function NoteCard({ note, onChanged }: NoteCardProps) {
    const [loading, setLoading] = useState(false);

    const handleEdit = async () => {
        const newTitle = prompt('Nuevo título:', note.title);
        if (newTitle === null) return;

        const newContent = prompt('Nuevo contenido:', note.content);
        if (newContent === null) return;

        try {
            setLoading(true);
            await noteService.updateNote(note.id, { title: newTitle, content: newContent });
            onChanged();
        } catch (err) {
            console.error(err);
            alert('Error al actualizar la nota');
        } finally {
            setLoading(false);
        }
    };

    const handleArchive = async () => {
        try {
            setLoading(true);
            await noteService.toggleArchive(note.id);
            onChanged();
        } catch (err) {
            console.error(err);
            alert('Error al archivar/desarchivar la nota');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const ok = confirm('¿Seguro que querés eliminar esta nota?');
        if (!ok) return;

        try {
            setLoading(true);
            await noteService.deleteNote(note.id);
            onChanged();
        } catch (err) {
            console.error(err);
            alert('Error al eliminar la nota');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Button variant="outline-primary" onClick={handleEdit} disabled={loading}>
                        Edit
                    </Button>

                    <Button variant="outline-secondary" onClick={handleArchive} disabled={loading}>
                        {note.archived ? 'Unarchive' : 'Archive'}
                    </Button>

                    <Button variant="outline-danger" onClick={handleDelete} disabled={loading}>
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default NoteCard;
