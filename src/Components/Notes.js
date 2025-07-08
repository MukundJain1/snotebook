import { useState, useContext, useEffect } from 'react';
import noteContext from '../Context/Notes/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';

const Notes = (props) => {
    const [show, setShow] = useState(false);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", econtent: "" });
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else{
            navigate('/signin');
        }
    },);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateNote = (currentNote) => {
        setNote({
            id: currentNote.id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            econtent: currentNote.content
        });
        handleShow();
    };

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });

    };

    const handleSave = (mess, type) => {
        props.showAlert(mess, type);
        editNote(note.id, note.etitle, note.edescription, note.econtent);
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="etitle"
                                value={note.etitle}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="edescription"
                                value={note.edescription}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="econtent"
                                value={note.econtent}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={note.etitle.length < 3 || note.edescription.length < 5 || note.econtent.length < 10} variant="primary" onClick={() => { handleSave('Successfully Updated the Note', 'success') }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="justify-content-center">
                {notes.map((note) => (
                    <Col
                        key={note.id}
                        xs={12} sm={6} md={4} lg={3}
                        className="d-flex align-items-stretch mb-4"
                    >
                        <NoteItem note={note} updateNote={updateNote} showAlert={props.showAlert} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Notes;
