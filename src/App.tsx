import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from './pages/Home';
import { useState } from 'react';
import type { Note } from './types';
import { noteService } from './services/NoteService';
import NoteModal from './components/noteModal/NoteModal';
import Category from './pages/Category';



export default function App() {

  const [showModal, setShowModal] = useState(false);
  const [noteDraft, setNoteDraft] = useState<Note>({ title: "", content: "" } as Note);

  const openCreate = () => {
    setNoteDraft({ title: "", content: "" } as Note); // sin id => create
    setShowModal(true);
  };

  const openEdit = async (id: number) => {
    const noteFromBack = await noteService.getNoteById(id); // precargar
    setNoteDraft(noteFromBack); // con id => edit
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <BrowserRouter>
      <Navbar onCreateNote={openCreate} />

      <Routes>
        <Route path="/" element={<Home showArchived={false} onEditNote={openEdit} />} />
        <Route path="/archived" element={<Home showArchived={true} onEditNote={openEdit} />} />
        <Route path="/categories" element={<Category/>} />
      </Routes>

      <NoteModal
        show={showModal}
        note={noteDraft}
        onChange={setNoteDraft}
        onHide={closeModal}
        categories={[]} // por ahora vacío si todavía no lo cargás en App
      />
    </BrowserRouter>
  );
}