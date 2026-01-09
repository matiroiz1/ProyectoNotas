import api from "../api/axios";
import type { Category } from "../types";

export const categoryService = {
    getAllCategories: async (): Promise<Category[]> => {
        const res = await api.get<Category[]>("/categories");
        return res.data;
    },
    createCategory: (category: Category) => api.post("/categories", category),
    updateCategory: (id: number, category: Category) => api.put(`/categories/${id}`, category),
    deleteCategory: (id: number) => api.delete(`/categories/${id}`),
    getCategoryById: (id: number) => api.get(`/categories/${id}`),
    addNoteToCategory: (categoryId: number, noteId: number) => api.post(`/categories/${categoryId}/notes/${noteId}`),
    removeNoteFromCategory: (categoryId: number, noteId: number) => api.delete(`/categories/${categoryId}/notes/${noteId}`),
}
