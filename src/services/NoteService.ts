import api from "../api/axios";
import type { Category, Note, NoteWithCategoriesDTO } from "../types";

export type CreateNotePayload = {
    title: string;
    content: string;
};

export const noteService = {
    // CREATE: POST /api/notes
    createNote: async (payload: CreateNotePayload): Promise<Note> => {
        const res = await api.post<Note>("/notes", payload);
        return res.data;
    },

    // UPDATE: PUT /api/notes/{id}
    updateNote: async (id: number, payload: CreateNotePayload): Promise<Note> => {
        const res = await api.put<Note>(`/notes/${id}`, payload);
        return res.data;
    },

    // ARCHIVE: PUT /api/notes/{id}/toggle-archive
    toggleArchive: async (id: number): Promise<Note> => {
        const res = await api.put<Note>(`/notes/${id}/toggle-archive`);
        return res.data;
    },

    // DELETE: DELETE /api/notes/{id}
    deleteNote: async (id: number): Promise<void> => {
        await api.delete(`/notes/${id}`);
    },

    getActiveNotes: async (): Promise<NoteWithCategoriesDTO[]> => {
        const res = await api.get<NoteWithCategoriesDTO[]>("/notes/active");
        return res.data;
    },

    getArchivedNotes: async (): Promise<NoteWithCategoriesDTO[]> => {
        const res = await api.get<NoteWithCategoriesDTO[]>("/notes/archived");
        return res.data;
    },
    // GET BY ID: GET /api/notes/{id}
    getNoteById: async (id: number): Promise<Note> => {
        const res = await api.get<Note>(`/notes/${id}`);
        return res.data;
    },
    // GET NOTE CATEGORIES: GET /api/notes/{id}/categories
    getNoteCategories: async (id: number): Promise<Category[]> => {
        const res = await api.get<Category[]>(`/notes/${id}/categories`);
        return res.data;
    },
};
