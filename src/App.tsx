import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import type { Category, Note } from "./types";
import { noteService } from "./services/NoteService";
import NoteModal from "./components/noteModal/NoteModal";
import CategoryPage from "./pages/Category";
import { categoryService } from "./services/CategoryService";
import CategoryModal from "./components/categoryModal/CategoryModal";
import ErrorContainer from "./components/alerts/ErrorContainer";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [noteDraft, setNoteDraft] = useState<Note>({ title: "", content: "" } as Note);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryDraft, setCategoryDraft] = useState<Category>({ name: "", description: "" } as Category);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoryService.getAllCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Listen for categories changes and refresh App-level categories (used by NoteModal)
  useEffect(() => {
    const handler = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener("categoriesChanged", handler);
    return () => window.removeEventListener("categoriesChanged", handler);
  }, []);

  const openCreate = () => {
    setNoteDraft({ title: "", content: "" } as Note);
    setShowModal(true);
  };

  const openCreateCategory = () => {
    setCategoryDraft({ name: "", description: "" } as Category);
    setShowCategoryModal(true);
  };

  const openEdit = async (id: number) => {
    try {
      const noteFromBack = await noteService.getNoteById(id);
      
      // Cargar las categorías de la nota si no vienen en la respuesta
      if (!noteFromBack.categories || noteFromBack.categories.length === 0) {
        const noteCategories = await noteService.getNoteCategories(id);
        noteFromBack.categories = noteCategories;
      }
      
      setNoteDraft(noteFromBack);
      setShowModal(true);
    } catch (err) {
      console.error("Error cargando nota para editar:", err);
      window.dispatchEvent(
        new CustomEvent("appError", {
          detail: {
            title: "Load Error",
            message: "Failed to load the note. Please try again.",
            variant: "danger",
          },
        })
      );
    }
  };

  const closeModal = () => setShowModal(false);
  const closeCategoryModal = () => setShowCategoryModal(false);

  return (
    <BrowserRouter>
      <Navbar onCreateNote={openCreate} onCreateCategory={openCreateCategory} />

      <ErrorContainer />

      <Routes>
        <Route path="/" element={<Home showArchived={false} onEditNote={openEdit} />} />
        <Route path="/archived" element={<Home showArchived={true} onEditNote={openEdit} />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>

      <NoteModal
        show={showModal}
        note={noteDraft}
        onChange={setNoteDraft}
        onHide={closeModal}
        categories={categories} 
      />

      <CategoryModal
        show={showCategoryModal}
        category={categoryDraft}
        onChange={setCategoryDraft}
        onHide={closeCategoryModal}
      />
    </BrowserRouter>
  );
}
