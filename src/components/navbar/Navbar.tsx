// Navbar.tsx
import { Container, Nav, Navbar as NavbarBootstrap, Button } from "react-bootstrap";
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
        <NavbarBootstrap.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5rem' }}>📝</span>
          <span>NotesApp</span>
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

        {isCategories ? (
          <Button variant="primary" onClick={onCreateCategory} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>+</span>
            <span>New Category</span>
          </Button>
        ) : (
          <Button variant="primary" onClick={onCreateNote} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>+</span>
            <span>New Note</span>
          </Button>
        )}
      </Container>
    </NavbarBootstrap>
  );
}