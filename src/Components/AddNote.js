import { useContext, useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import NoteContext from '../Context/Notes/noteContext';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", content: "" });

    const onchange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    };

    const handleClick = (e) => {
        e.preventDefault();
         addNote(note.title, note.description, note.content);
            props.showAlert('Note added successfully', 'success');
            setNote({ title: "", description: "", content: "" });
    };

    return (
        <Container className="my-5 d-flex justify-content-center">
            <motion.div
                className="w-100"
                style={{ maxWidth: '600px' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <Card className="shadow rounded-4 p-4">
                    <h3 className="text-center mb-4 text-primary">Add a Note</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={note.title}
                                placeholder="Enter title"
                                onChange={onchange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={note.description}
                                placeholder="Enter description"
                                onChange={onchange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="content"
                                value={note.content}
                                placeholder="Write what's on your mind..."
                                onChange={onchange}
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button
                                disabled={note.title.length < 3 || note.description.length < 5 || note.content.length < 10}
                                variant="primary"
                                type="submit"
                                onClick={handleClick}
                            >
                                <PlusCircle className="me-2" size={18} /> Add Note
                            </Button>
                        </div>
                    </Form>
                </Card>
            </motion.div>
        </Container>
    );
};

export default AddNote;
