import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { noteService } from '../../services/NoteService';
import type { Note, Category } from '../../types/index.ts';
import Modal from 'react-bootstrap/Modal';

type NoteModalProps = {
    note: Note;
    show: boolean;
    onHide: () => void;
    onChange: (note: Note) => void;
    categories: Category[];
}


function NoteModal({ note, show, onHide, onChange, categories }: NoteModalProps) {
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (note.id) {
                // Si tiene ID, es una edición
                await noteService.updateNote(note.id, note);
            } else {
                // Si no tiene ID, es creación
                await noteService.createNote(note);
            }
            onHide(); // Cerramos el modal
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{note.id ? 'Edit Note' : 'Create Note'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            placeholder="Write a Title here..." 
                            value={note.title || ''} 
                            onChange={(e) => onChange({ ...note, title: e.target.value })}
                            required 
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={3}
                            placeholder="Explain yourself..." 
                            value={note.content || ''} 
                            onChange={(e) => onChange({ ...note, content: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category (Optional)</Form.Label>
                        <Form.Select 
                            // Aquí manejamos la lógica de categorías
                            onChange={(e) => {
                                const selectedId = Number(e.target.value);
                                const category = categories.find(c => c.id === selectedId);
                                if (category) {
                                    onChange({ ...note, categories: [category] });
                                }
                            }}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide}>Cancel</Button>
                        <Button variant="primary" type="submit">
                            {note.id ? 'Save Changes' : 'Create Note'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default NoteModal;