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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 16 }}>
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    onChanged={loadCategories}
                />
            ))}
        </div>
    );
}