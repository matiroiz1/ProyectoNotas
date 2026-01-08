import api from "../api/axios";
import type { Category } from "../types";

export const categoryService = {
    getAllCategories: () => api.get("/categories"),
    createCategory: (category: Category) => api.post("/categories", category),
    updateCategory: (id: number, category: Category) => api.put(`/categories/${id}`, category),
    deleteCategory: (id: number) => api.delete(`/categories/${id}`),
    getCategoryById: (id: number) => api.get(`/categories/${id}`),
    addNoteToCategory: (noteId: number, categoryId: number) => api.post(`/categories/${categoryId}/notes/${noteId}`),
    removeNoteFromCategory: (noteId: number, categoryId: number) => api.delete(`/categories/${categoryId}/notes/${noteId}`),
}
