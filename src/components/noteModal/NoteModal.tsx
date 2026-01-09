import { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { noteService } from "../../services/NoteService";
import { categoryService } from "../../services/CategoryService";
import type { Note, Category } from "../../types";

type NoteModalProps = {
  note: Note;
  show: boolean;
  onHide: () => void;
  onChange: (note: Note) => void;
  categories: Category[];
};

function NoteModal({ note, show, onHide, onChange, categories }: NoteModalProps) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [initialCategoryIds, setInitialCategoryIds] = useState<number[]>([]);

  // cuando abrís el modal:
  // - si es edit: precarga categorías actuales de la nota
  // - si es create: arranca vacío
  useEffect(() => {
    if (!show) return;

    const ids = (note.categories ?? []).map((c) => c.id);
    setInitialCategoryIds(ids);
    setSelectedCategoryIds(ids);
  }, [show, note.id]); // note.id cambia entre create/edit

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (note.id) {
        // 1) Update de texto
        await noteService.updateNote(note.id, { title: note.title, content: note.content });

        // 2) Sync de relación categories (add/remove)
        const initial = new Set(initialCategoryIds);
        const selected = new Set(selectedCategoryIds);

        const toRemove = initialCategoryIds.filter((id) => !selected.has(id));
        const toAdd = selectedCategoryIds.filter((id) => !initial.has(id));

        // Procesa removals secuencialmente con manejo de errores
        for (const catId of toRemove) {
          try {
            console.log(`Removiendo categoría ${catId} de la nota ${note.id}`);
            await categoryService.removeNoteFromCategory(catId, note.id);
            console.log(`Categoría ${catId} removida exitosamente`);
          } catch (err) {
            console.error(`Error al remover categoría ${catId}:`, err);
          }
        }

        // Procesa additions secuencialmente con manejo de errores
        for (const catId of toAdd) {
          try {
            console.log(`Agregando categoría ${catId} a la nota ${note.id}`);
            await categoryService.addNoteToCategory(catId, note.id);
            console.log(`Categoría ${catId} agregada exitosamente`);
          } catch (err) {
            console.error(`Error al agregar categoría ${catId}:`, err);
          }
        }
      } else {
        // CREATE
        const created = await noteService.createNote({ title: note.title, content: note.content });

        // asignar 0..N categorías
        for (const catId of selectedCategoryIds) {
          try {
            await categoryService.addNoteToCategory(catId, created.id);
          } catch (err) {
            console.error(`Error al agregar categoría ${catId} a nota nueva:`, err);
          }
        }
      }

      onHide();
      // notify other parts of the app that notes changed (create/update)
      window.dispatchEvent(new Event("notesChanged"));
    } catch (error) {
      console.error("Error saving note:", error);
      window.dispatchEvent(
        new CustomEvent("appError", {
          detail: {
            title: "Save Error",
            message: "Failed to save the note. Please try again.",
            variant: "danger",
          },
        })
      );
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="note-modal">
      <Modal.Header closeButton>
        <Modal.Title style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className={`bi ${note.id ? 'bi-pencil-fill' : 'bi-plus'}`} style={{ fontSize: '1.2rem' }}></i>
          <span>{note.id ? "Edit Note" : "Create Note"}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Write a title here..."
              value={note.title || ""}
              onChange={(e) => onChange({ ...note, title: e.target.value })}
              required
              style={{ fontSize: '1rem' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Write your note content here..."
              value={note.content || ""}
              onChange={(e) => onChange({ ...note, content: e.target.value })}
              required
              style={{ fontSize: '1rem', resize: 'vertical' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categories (Optional)</Form.Label>
            <div className="categories-list" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.length > 0 ? (
                categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      if (selectedCategoryIds.includes(c.id)) {
                        setSelectedCategoryIds(selectedCategoryIds.filter(id => id !== c.id));
                      } else {
                        setSelectedCategoryIds([...selectedCategoryIds, c.id]);
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: 'none',
                      backgroundColor: selectedCategoryIds.includes(c.id) ? 'var(--primary-color)' : 'var(--bg-secondary)',
                      color: selectedCategoryIds.includes(c.id) ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: selectedCategoryIds.includes(c.id) ? '600' : '500',
                      transition: 'all 0.2s ease',
                      borderWidth: selectedCategoryIds.includes(c.id) ? '0' : '1px',
                      borderStyle: 'solid',
                      borderColor: 'var(--border-color)',
                      fontSize: '0.95rem'
                    }}
                    onMouseEnter={(e) => {
                      if (!selectedCategoryIds.includes(c.id)) {
                        e.currentTarget.style.backgroundColor = 'var(--border-color)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedCategoryIds.includes(c.id)) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                      }
                    }}
                  >
                    {c.name}
                  </button>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                  No categories available
                </p>
              )}
            </div>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2" style={{ marginTop: '24px' }}>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className={`bi ${note.id ? 'bi-check' : 'bi-plus'}`}></i>
              <span>{note.id ? "Save Changes" : "Create Note"}</span>
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NoteModal;
