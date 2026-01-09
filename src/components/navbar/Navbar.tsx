// Navbar.tsx
import { Container, Nav, Navbar as NavbarBootstrap, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  onCreateNote: () => void;
};

export default function Navbar({ onCreateNote }: Props) {
  return (
    <NavbarBootstrap expand="lg" className="bg-body-tertiary">
      <Container>
        <NavbarBootstrap.Brand as={Link} to="/">NotesApp</NavbarBootstrap.Brand>

        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBootstrap.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Active</Nav.Link>
            <Nav.Link as={Link} to="/archived">Archived</Nav.Link>
            <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
          </Nav>
        </NavbarBootstrap.Collapse>

        <Button variant="primary" onClick={onCreateNote}>
          New Note
        </Button>
      </Container>
    </NavbarBootstrap>
  );
}
