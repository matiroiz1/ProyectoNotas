import { useEffect, useState } from "react";
import type { Category } from "../types";
import { categoryService } from "../services/CategoryService";
import CategoryCard from "../components/categoryCard/CategoryCard";
import CategoryModal from "../components/categoryModal/CategoryModal";


export default function Category() {
    const [categories, setCategories] = useState<Category[]>([]);

    const emptyCategory: Category = { id: 0, name: "", description: "" };
    const [showModal, setShowModal] = useState(false);
    const [draftCategory, setDraftCategory] = useState<Category>(emptyCategory);

    const loadCategories = async () => {
        const data = await categoryService.getAllCategories();
        setCategories(data);
    };

    const handleCreate = () => {
        setDraftCategory(emptyCategory);
        setShowModal(true);
    };

    const handleEdit = (category: Category) => {
        setDraftCategory({ ...category }); // copia para editar sin tocar la lista
        setShowModal(true);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    // Listen for global categories changes (create/update from modal)
    useEffect(() => {
        const handler = () => loadCategories();
        window.addEventListener("categoriesChanged", handler);
        return () => window.removeEventListener("categoriesChanged", handler);
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
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
            <CategoryModal
                category={draftCategory}
                show={showModal}
                onHide={() => setShowModal(false)}
                onChange={setDraftCategory}
            />
        </div >
    );
}