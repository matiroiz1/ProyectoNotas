import Navbar from "./components/navbar/Navbar";
import NoteCard from "./components/noteCard/NoteCard";

export default function App() {
    return (
        <>
            <Navbar />
            <ActiveNotesPage />
        </>
    );
}