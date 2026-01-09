import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import type { Category } from '../../types';
import { categoryService } from '../../services/CategoryService';

type CategoryCardProps = {
    category: Category;
    onChanged: () => void; // Esta es la función loadNotes que viene del padre
}

function CategoryCard({ category, onChanged}: CategoryCardProps) {

    const handleDelete = async()=>{
        await categoryService.deleteCategory(category.id);
        onChanged();
    }

    return (
        <Card style={{ width: '18rem', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px' }}>
                <Card.Title style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 600, 
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span style={{ fontSize: '1.3rem' }}>◉</span>
                    <span>{category.name}</span>
                </Card.Title>
                <Card.Text style={{ 
                    flex: 1,
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                }}>
                    {category.description || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No description</span>}
                </Card.Text>
                <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-color)'
                }}>
                    <Button variant="primary" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>✎</span>
                        <span>Edit</span>
                    </Button>
                    <Button variant="danger" size="sm" onClick={handleDelete} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>×</span>
                        <span>Delete</span>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CategoryCard;
