import { useEffect, useState } from "react";
import NoteCard from "../components/noteCard/NoteCard";
import { noteService } from "../services/NoteService";
import type { Note } from "../types";

export default function ActiveNotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);

    const loadNotes = async () => {
        const data = await noteService.getActiveNotes();
        setNotes(data);
    };

    useEffect(() => {
        loadNotes();
    }, []);

    return (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 16 }}>
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} onChanged={loadNotes} />
            ))}
        </div>
    );
}
