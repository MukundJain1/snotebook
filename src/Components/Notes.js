import React, { useState, useContext, useEffect } from 'react';
import noteContext from '../Context/Notes/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
import { Col, Modal, Button, Form, Badge, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../index.css';
import NoNotes from './NoNote';

const Notes = ({ showAlert }) => {
    const [show, setShow] = useState(false);
    const [note, setNote] = useState({ id: '', etitle: '', edescription: '', econtent: '' });
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = useContext(noteContext);

    useEffect(() => {
        if (localStorage.getItem('token')) getNotes();
        else navigate('/signin');
    });

    const handleShow = (currentNote) => {
        setNote({
            id: currentNote.id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            econtent: currentNote.content
        });
        setShow(true);
    };
    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        editNote(note.id, note.etitle, note.edescription, note.econtent);
        showAlert('Note updated successfully', 'success');
        handleClose();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                size="lg"
                dialogClassName="ruled-paper"
            >
                <Card className="shadow shadow-sm position-relative" style={{ fontFamily: 'Lora, serif', padding: '1.5rem' }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Badge bg="secondary" className="mb-3 px-3 py-2" style={{ fontSize: '1rem' }}>
                            ✏️ Edit Note
                        </Badge>
                        <Form>
                            <Form.Group className="mb-3" controlId="editTitle">
                                <Form.Label className="fw-bold">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="etitle"
                                    value={note.etitle}
                                    onChange={handleChange}
                                    className="border-0 border-bottom rounded-0"
                                    style={{ background: 'transparent' }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="editDescription">
                                <Form.Label className="fw-bold">Subtitle</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="edescription"
                                    value={note.edescription}
                                    onChange={handleChange}
                                    className="border-0 border-bottom rounded-0 fst-italic"
                                    style={{ background: 'transparent' }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="editContent">
                                <Form.Label className="fw-bold">Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    name="econtent"
                                    value={note.econtent}
                                    onChange={handleChange}
                                    className="border-0 rounded-0"
                                    style={{ background: 'transparent', resize: 'none', whiteSpace: 'pre-wrap' }}
                                />
                            </Form.Group>
                        </Form>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                disabled={
                                    note.etitle.length < 3 ||
                                    note.edescription.length < 5 ||
                                    note.econtent.length < 10
                                }
                                variant="outline-success"
                                onClick={handleSave}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </motion.div>
                </Card>
            </Modal>

            <div className="note-container d-flex flex-wrap">
                {notes.map((n) => (
                    <Col key={n.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <NoteItem note={n} updateNote={handleShow} showAlert={showAlert} />
                    </Col>
                ))}
            </div>

        </>
    );
};

export default Notes;
