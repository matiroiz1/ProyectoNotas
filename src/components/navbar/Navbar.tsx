// Navbar.tsx
import { Container, Nav, Navbar as NavbarBootstrap, Button } from "react-bootstrap";
import ThemeSwitcher from "../theme/ThemeSwitcher";
import { Link, useLocation } from "react-router-dom";


type Props = {
  onCreateNote: () => void;
  onCreateCategory: () => void;
};


export default function Navbar({ onCreateNote, onCreateCategory }: Props) {
  const location = useLocation();
  const isCategories = location.pathname === "/categories";
  const isArchived = location.pathname === "/archived";

  return (
    <NavbarBootstrap expand="lg" className="bg-body-tertiary">
      <Container>
        <NavbarBootstrap.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <i className="bi bi-journal-bookmark-fill" style={{ fontSize: '2rem' }}></i>
          <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>NotesApp</span>
        </NavbarBootstrap.Brand>

        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBootstrap.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === "/" ? "active" : ""}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span style={{ fontSize: '0.7rem' }}>●</span>
              <span>Active</span>
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/archived"
              className={isArchived ? "active" : ""}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span style={{ fontSize: '0.9rem' }}>◐</span>
              <span>Archived</span>
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/categories"
              className={isCategories ? "active" : ""}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span style={{ fontSize: '0.9rem' }}>◉</span>
              <span>Categories</span>
            </Nav.Link>
          </Nav>
        </NavbarBootstrap.Collapse>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ThemeSwitcher />
        {isCategories ? (
          <Button variant="primary" onClick={onCreateCategory} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <i className="bi bi-plus"></i>
            <span>New Category</span>
          </Button>
        ) : (
          <Button variant="primary" onClick={onCreateNote} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <i className="bi bi-plus"></i>
            <span>New Note</span>
          </Button>
        )}
        </div>
      </Container>
    </NavbarBootstrap>
  );
}