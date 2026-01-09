import api from "../api/axios";
import type { Note } from "../types";

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

    // GET: GET /api/notes
    getActiveNotes: async (): Promise<Note[]> => {
        const res = await api.get<Note[]>("/notes/active");
        return res.data;
    },

    // GET ARCHIVED: GET /api/notes/archived
    getArchivedNotes: async (): Promise<Note[]> => {
        const res = await api.get<Note[]>("/notes/archived");
        return res.data;
    },
    // GET BY ID: GET /api/notes/{id}
    getNoteById: async (id: number): Promise<Note> => {
        const res = await api.get<Note>(`/notes/${id}`);
        return res.data;
    },
};
