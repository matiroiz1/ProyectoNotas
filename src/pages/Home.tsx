import { useEffect, useState } from "react";
import NoteCard from "../components/noteCard/NoteCard";
import { noteService } from "../services/NoteService";
import type { Note, NoteWithCategoriesDTO } from "../types";

type HomeProps = {
    showArchived: boolean;
    onEditNote: (id: number) => void;
};

export default function Home({ showArchived, onEditNote }: HomeProps) {
    const [notes, setNotes] = useState<NoteWithCategoriesDTO[]>([])

    const loadNotes = async () => {
        const data = showArchived
            ? await noteService.getArchivedNotes()
            : await noteService.getActiveNotes();
        setNotes(data);
    };

    useEffect(() => {
        loadNotes();
    }, [showArchived]);

    return (
        <div className="main-container">
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
                            onChanged={loadNotes}
                            onEdit={onEditNote}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}