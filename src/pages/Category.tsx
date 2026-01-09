import { useEffect, useState } from "react";
import type { Category } from "../types";
import { categoryService } from "../services/CategoryService";
import CategoryCard from "../components/categoryCard/CategoryCard";


export default function Category() {
    const [categories, setCategories] = useState<Category[]>([]);

    const loadCategories = async () => {
        const data = await categoryService.getAllCategories();
        setCategories(data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div className="main-container">
            {categories.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">◉</div>
                    <h3 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        No categories
                    </h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Create your first category to organize your notes!
                    </p>
                </div>
            ) : (
                <div className="cards-grid">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onChanged={loadCategories}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}