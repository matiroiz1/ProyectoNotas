import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from './pages/Home';
import NoteModal from './components/noteModal/NoteModal';




export default function App() {
    return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Renderiza Notas Activas */}
        <Route path="/" element={<Home showArchived={false} />} />
        
        {/* Renderiza Notas Archivadas (Reusando el mismo componente) */}
        <Route path="/archived" element={<Home showArchived={true} />} />
      </Routes>
    </BrowserRouter>
    );
}