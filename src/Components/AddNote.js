import React, { useContext, useState } from 'react';
import { Form, Button, Container, Card, Badge } from 'react-bootstrap';
import NoteContext from '../Context/Notes/noteContext';
import { PlusCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import '../index.css';

const AddNote = ({ showAlert }) => {
    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({ title: '', description: '', content: '' });
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(prev => !prev);
    const onchange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.content);
        showAlert('Note added successfully', 'success');
        setNote({ title: '', description: '', content: '' });
        setShowForm(false);
    };

    return (
        <Container className="my-4 d-flex justify-content-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '650px' }}
            >
                {/* Toggle Button */}
                <div className="d-grid mb-3">
                    <Button
                        style={{
                            backgroundColor: 'transparent',
                            borderColor: '#2e7d32',
                            color: '#2e7d32'
                        }}
                        variant={showForm ? 'outline-danger' : 'outline-primary'}
                        size="lg"
                        onClick={toggleForm}
                    >
                        {showForm ? 'Close Form' : <><PlusCircle className="me-2" size={20} /> Add Note</>}
                    </Button>
                </div>

                {showForm && (
                    <Card
                        className="ruled-paper shadow rounded-3 position-relative"
                        style={{ padding: '2rem', fontFamily: 'Lora, serif' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Header Badge */}
                            <Badge bg="secondary" className="mb-3 px-3 py-2" style={{ fontSize: '1rem' }}>
                                ✍️ New Note
                            </Badge>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label className="fw-bold">Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={note.title}
                                        placeholder="e.g., How to host backend"
                                        onChange={onchange}
                                        className="border-0 border-bottom rounded-0"
                                        style={{ background: 'transparent' }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label className="fw-bold">Subtitle</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        value={note.description}
                                        placeholder="e.g., Steps for deploying on Render"
                                        onChange={onchange}
                                        className="border-0 border-bottom rounded-0 fst-italic"
                                        style={{ background: 'transparent' }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formContent">
                                    <Form.Label className="fw-bold">Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={6}
                                        name="content"
                                        value={note.content}
                                        placeholder="Write your detailed notes here..."
                                        onChange={onchange}
                                        className="border-0 rounded-0"
                                        style={{ background: 'transparent', resize: 'none', whiteSpace: 'pre-wrap' }}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button
                                        disabled={note.title.length < 3 || note.description.length < 5 || note.content.length < 10}
                                        variant="outline-success"
                                        size="lg"
                                        type="submit"
                                    >
                                        <CheckCircle2 className="me-2" size={20} /> Save Note
                                    </Button>
                                </div>
                            </Form>
                        </motion.div>
                    </Card>
                )}
            </motion.div>
        </Container>
    );
};

export default AddNote;
