import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import type { Note, NoteWithCategoriesDTO } from "../../types";
import { noteService } from "../../services/NoteService";

type NoteCardProps = {
  note: NoteWithCategoriesDTO;
  onChanged: () => void;
  onEdit: (id: number) => void;
};

function NoteCard({ note, onChanged, onEdit }: NoteCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return "Unknown date";
    const d = new Date(date);
    return d.toLocaleDateString("es-ES", { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleArchive = async () => {
    await noteService.toggleArchive(note.id);
    onChanged();
  };

  const handleDelete = async () => {
    await noteService.deleteNote(note.id);
    onChanged();
  };

  return (
    <>
      <Card
        style={{ width: "18rem", cursor: "pointer", minHeight: "280px", display: "flex", flexDirection: "column" }}
        onClick={() => setShowPreview(true)}
      >
        <Card.Body style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Card.Title style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <i className="bi bi-journal-bookmark-fill" style={{ fontSize: "1.2rem" }}></i>
            <span>{note.title}</span>
          </Card.Title>

          {/* Categorías */}
          <div style={{ marginBottom: "12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {note.categories?.length ? (
              note.categories.map((c) => (
                <Badge bg="secondary" key={c.id} style={{ padding: "4px 8px", fontSize: "0.75rem" }}>
                  {c.name}
                </Badge>
              ))
            ) : (
              <Badge bg="light" text="dark" style={{ padding: "4px 8px", fontSize: "0.75rem" }}>
                No category
              </Badge>
            )}
          </div>

          {/* Texto corto en la card */}
          <Card.Text style={{ 
            flex: 1, 
            color: "var(--text-secondary)", 
            fontSize: "0.9rem",
            lineHeight: "1.5",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical"
          }}>
            {(note.content ?? "").length > 120
              ? note.content.slice(0, 120) + "..."
              : note.content || <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No content</span>}
          </Card.Text>

          <div style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            marginTop: "12px",
            paddingBottom: "12px",
            borderBottom: "1px solid var(--border-color)"
          }}>
            <div>Created: {formatDate(note.creationDate)}</div>
            {note.lastModifiedDate && <div>Modified: {formatDate(note.lastModifiedDate)}</div>}
          </div>

          <div style={{ 
            display: "flex", 
            gap: "8px",
            justifyContent: "center",
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border-color)"
          }}>
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note.id);
              }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
            >
              <i className="bi bi-pencil-fill"></i>
              <span>Edit</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleArchive();
              }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
            >
              <i className="bi bi-archive"></i>
              <span>{note.archived ? "Unarchive" : "Archive"}</span>
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
            >
              <i className="bi bi-trash3"></i>
              <span>Delete</span>
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Popup para ver completo */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <i className="bi bi-journal-bookmark-fill" style={{ fontSize: "1.3rem" }}></i>
            <span>{note.title}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: "16px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {note.categories?.length ? (
              note.categories.map((c) => (
                <Badge bg="secondary" key={c.id} style={{ padding: "4px 8px", fontSize: "0.75rem" }}>
                  {c.name}
                </Badge>
              ))
            ) : (
              <Badge bg="light" text="dark" style={{ padding: "4px 8px", fontSize: "0.75rem" }}>
                No category
              </Badge>
            )}
          </div>

          <div style={{ 
            whiteSpace: "pre-wrap", 
            color: "var(--text-secondary)",
            lineHeight: "1.6",
            fontSize: "0.95rem",
            marginBottom: "16px"
          }}>
            {note.content || <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No content</span>}
          </div>

          <div style={{ 
            paddingTop: "16px",
            borderTop: "1px solid var(--border-color)",
            fontSize: "0.85rem",
            color: "var(--text-muted)"
          }}>
            <div style={{ marginBottom: "6px" }}>
              <strong>Created:</strong> {formatDate(note.creationDate)}
            </div>
            {note.lastModifiedDate && (
              <div>
                <strong>Modified:</strong> {formatDate(note.lastModifiedDate)}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NoteCard;
