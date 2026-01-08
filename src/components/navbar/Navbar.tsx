import { Container, Nav, Navbar as NavbarBootstrap } from 'react-bootstrap';

export default function Navbar() {

    return (
        <NavbarBootstrap expand="lg" className="bg-body-tertiary">
            <Container>
                <NavbarBootstrap.Brand href="#home">NotesApp</NavbarBootstrap.Brand>
                <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
                <NavbarBootstrap.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Active</Nav.Link>
                        <Nav.Link href="#link">Archived</Nav.Link>
                        <Nav.Link href="#link">Categories</Nav.Link>
                    </Nav>
                </NavbarBootstrap.Collapse>
            </Container>
        </NavbarBootstrap>
    );
}
