import { useState } from 'react';
import { Container, Nav, Navbar as NavbarBootstrap, Button } from 'react-bootstrap';
import NoteModal from '../noteModal/NoteModal';

const [showModal, setShowModal] = useState(false);

export default function Navbar() {

    return (
        <NavbarBootstrap expand="lg" className="bg-body-tertiary">
            <Container>
                <NavbarBootstrap.Brand href="#home">NotesApp</NavbarBootstrap.Brand>
                <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
                <NavbarBootstrap.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Active</Nav.Link>
                        <Nav.Link href="/archived">Archived</Nav.Link>
                        <Nav.Link href="/categories">Categories</Nav.Link>
                    </Nav>
                </NavbarBootstrap.Collapse>
                <Button variant="primary" onClick={() => setShowModal(true)}>New Note</Button>
                <NoteModal show={showModal} onHide={() => setShowModal(false)} />
            </Container>
        </NavbarBootstrap>
    );
}
