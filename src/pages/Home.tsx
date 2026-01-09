import { useEffect, useState } from "react";
import NoteCard from "../components/noteCard/NoteCard";
import { noteService } from "../services/NoteService";
import type { Note } from "../types";

type HomeProps = {
    showArchived: boolean;
    onEditNote: (id: number) => void;
};

export default function Home({ showArchived, onEditNote }: HomeProps) {
    const [notes, setNotes] = useState<Note[]>([]);

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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 16 }}>
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onChanged={loadNotes}
                    onEdit={onEditNote}
                />
            ))}
        </div>
    );
}