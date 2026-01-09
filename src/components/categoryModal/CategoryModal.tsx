import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import type { Category } from '../../types/index.ts';
import Modal from 'react-bootstrap/Modal';
import { categoryService } from '../../services/CategoryService.ts';

type CategoryModalProps = {
    category: Category;
    show: boolean;
    onHide: () => void;
    onChange: (category: Category) => void;
}


function CategoryModal({ category, show, onHide, onChange }: CategoryModalProps) {


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
            // notify other parts of the app that categories changed
            window.dispatchEvent(new Event("categoriesChanged"));
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered className="category-modal">
            <Modal.Header closeButton>
                <Modal.Title style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className={`bi ${category.id ? 'bi-pencil-fill' : 'bi-plus'}`} style={{ fontSize: '1.2rem' }}></i>
                    <span>{category.id ? 'Edit Category' : 'Create Category'}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder="Enter category name..."
                            value={category.name || ''}
                            onChange={(e) => onChange({ ...category, name: e.target.value })}
                            required
                            style={{ fontSize: '1rem' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Enter category description..."
                            value={category.description || ''}
                            onChange={(e) => onChange({ ...category, description: e.target.value })}
                            required
                            style={{ fontSize: '1rem', resize: 'vertical' }}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2" style={{ marginTop: '24px' }}>
                        <Button variant="secondary" onClick={onHide}>Cancel</Button>
                        <Button variant="primary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <i className={`bi ${category.id ? 'bi-check' : 'bi-plus'}`}></i>
                            <span>{category.id ? 'Save Changes' : 'Create Category'}</span>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CategoryModal;