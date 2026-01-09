import { useEffect, useState } from "react";
import NoteCard from "../components/noteCard/NoteCard";
import { noteService } from "../services/NoteService";
import { categoryService } from "../services/CategoryService";
import type { Note, NoteWithCategoriesDTO, Category } from "../types";

type HomeProps = {
    showArchived: boolean;
    onEditNote: (id: number) => void;
};

export default function Home({ showArchived, onEditNote }: HomeProps) {
    const [notes, setNotes] = useState<NoteWithCategoriesDTO[]>([])
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const loadNotes = async (categoryName?: string) => {
        try {
            if (categoryName) {
                const data = await noteService.getNotesByCategory(categoryName, showArchived);
                setNotes(data);
                return;
            }

            const data = showArchived
                ? await noteService.getArchivedNotes()
                : await noteService.getActiveNotes();
            setNotes(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadNotes(selectedCategory || undefined);
    }, [showArchived, selectedCategory]);

    // load categories for filter
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await categoryService.getAllCategories();
                setCategories(data);
            } catch (err) {
                console.error(err);
            }
        };

        loadCategories();

        const handler = () => loadCategories();
        window.addEventListener("categoriesChanged", handler);
        return () => window.removeEventListener("categoriesChanged", handler);
    }, []);

    // Listen for global notes changes (create/update from modal)
    useEffect(() => {
        const handler = () => loadNotes(selectedCategory || undefined);
        window.addEventListener("notesChanged", handler);
        return () => window.removeEventListener("notesChanged", handler);
    }, [showArchived, selectedCategory]);

    return (
        <div className="main-container">
            <div style={{ 
                marginBottom: '24px', 
                display: 'flex', 
                gap: '8px', 
                flexWrap: 'wrap',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '8px',
                borderLeft: '4px solid var(--primary-color)'
            }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '500', marginRight: '8px' }}>Categories:</span>
                
                <button
                    onClick={() => setSelectedCategory("")}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: 'none',
                        backgroundColor: selectedCategory === "" ? 'var(--primary-color)' : 'var(--bg-secondary)',
                        color: selectedCategory === "" ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: selectedCategory === "" ? '600' : '500',
                        transition: 'all 0.2s ease',
                        borderWidth: selectedCategory === "" ? '0' : '1px',
                        borderStyle: 'solid',
                        borderColor: 'var(--border-color)'
                    }}
                    onMouseEnter={(e) => {
                        if (selectedCategory !== "") {
                            e.currentTarget.style.backgroundColor = 'var(--border-color)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (selectedCategory !== "") {
                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        }
                    }}
                >
                    All Notes
                </button>

                {categories.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.name)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: 'none',
                            backgroundColor: selectedCategory === c.name ? 'var(--primary-color)' : 'var(--bg-secondary)',
                            color: selectedCategory === c.name ? 'white' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontWeight: selectedCategory === c.name ? '600' : '500',
                            transition: 'all 0.2s ease',
                            borderWidth: selectedCategory === c.name ? '0' : '1px',
                            borderStyle: 'solid',
                            borderColor: 'var(--border-color)'
                        }}
                        onMouseEnter={(e) => {
                            if (selectedCategory !== c.name) {
                                e.currentTarget.style.backgroundColor = 'var(--border-color)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (selectedCategory !== c.name) {
                                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                            }
                        }}
                    >
                        {c.name}
                    </button>
                ))}
            </div>

            {notes.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📝</div>
                    <h3 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        {showArchived ? 'No archived notes' : 'No active notes'}
                    </h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {showArchived
                            ? 'You don\'t have any archived notes yet.'
                            : 'Create your first note to get started!'}
                    </p>
                </div>
            ) : (
                <div className="cards-grid">
                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onChanged={() => loadNotes(selectedCategory || undefined)}
                            onEdit={onEditNote}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}