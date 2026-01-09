import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import type { Note, Category } from '../../types/index.ts';
import Modal from 'react-bootstrap/Modal';
import { categoryService } from '../../services/CategoryService.ts';

type CategoryModalProps = {
    category: Category;
    show: boolean;
    onHide: () => void;
    onChange: (category: Category) => void;
    categories: Category[];
}


function CategoryModal({ category, show, onHide, onChange, categories }: CategoryModalProps) {


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (category.id) {
                // EDIT (por ahora no tocamos categoría)
                await categoryService.updateCategory(category.id, category);
            } else {
                // CREATE
                await categoryService.createCategory(category);
            }
            onHide();
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{category.id ? 'Edit Category' : 'Create Category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder="Write a Title here..."
                            value={category.name || ''}
                            onChange={(e) => onChange({ ...category, name: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Explain yourself..."
                            value={category.description || ''}
                            onChange={(e) => onChange({ ...category, description: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide}>Cancel</Button>
                        <Button variant="primary" type="submit">
                            {category.id ? 'Save Changes' : 'Create Category'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CategoryModal;