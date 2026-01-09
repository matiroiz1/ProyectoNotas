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
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>{category.description}</Card.Text>
                <Button variant="primary">Edit</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default CategoryCard;
