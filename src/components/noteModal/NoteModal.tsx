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

        await Promise.all(toRemove.map((catId) => categoryService.removeNoteFromCategory(catId, note.id)));
        await Promise.all(toAdd.map((catId) => categoryService.addNoteToCategory(catId, note.id)));
      } else {
        // CREATE
        const created = await noteService.createNote({ title: note.title, content: note.content });

        // asignar 0..N categorías
        await Promise.all(
          selectedCategoryIds.map((catId) => categoryService.addNoteToCategory(catId, created.id))
        );
      }

      onHide();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>{note.id ? "✎" : "＋"}</span>
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
            <Form.Select
              multiple
              value={selectedCategoryIds.map(String)}
              onChange={(e) => {
                const values = Array.from(e.currentTarget.selectedOptions).map((opt) => Number(opt.value));
                setSelectedCategoryIds(values);
              }}
              style={{ minHeight: '100px' }}
            >
              {categories.length > 0 ? (
                categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
              ) : (
                <option disabled>No categories available</option>
              )}
            </Form.Select>

            <Form.Text muted style={{ fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
              Tip: Hold Ctrl (Windows) / Cmd (Mac) to select multiple categories.
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2" style={{ marginTop: '24px' }}>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{note.id ? "✓" : "＋"}</span>
              <span>{note.id ? "Save Changes" : "Create Note"}</span>
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NoteModal;
