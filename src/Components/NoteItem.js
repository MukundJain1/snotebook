import React from 'react';
import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Trash2, Edit2 } from 'lucide-react';
import NoteContext from '../Context/Notes/noteContext';
import { motion } from 'framer-motion';
import '../index.css';

const NoteItem = (props) => {
    const { deleteNote } = useContext(NoteContext);
    const { note, updateNote } = props;

    const handleDelete = (id) => {
        deleteNote(id);
        props.showAlert('Deleted the Note', 'danger');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
        >
            <Card className="shadow-sm rounded-3 border border-secondary mb-4 position-relative" style={{ background: '#ffffff', width: '18rem' }}>
                <Card.Body className="d-flex flex-column" style={{ paddingBottom: '4rem' }}>
                    {/* Title */}
                    <Card.Title className="fw-bold mb-2 text-primary" style={{ fontSize: '1.25rem' }}>
                        {note.title}
                    </Card.Title>

                    {/* Description */}
                    <Card.Subtitle
                        className="mb-3 text-secondary"
                        style={{ fontStyle: 'italic', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}
                    >
                        {note.description}
                    </Card.Subtitle>

                    {/* Main Content */}
                    <Card.Text className="mb-3 text-dark" style={{ lineHeight: '1.6rem' }}>
                        {note.content}
                    </Card.Text>

                    {/* Actions */}
                    <div className="d-flex justify-content-between mt-auto">
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(note.id)}
                        >
                            <Trash2 size={16} />
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => updateNote(note)}
                        >
                            <Edit2 size={16} />
                        </Button>
                    </div>

                    {/* Metadata - positioned bottom-left */}
                    <div className="position-absolute text-muted" style={{ fontSize: '0.7rem', bottom: '0.75rem', left: '1rem' }}>
                        <div><strong>Created:</strong> {note.created_at}</div>
                        <div><strong>Updated:</strong> {note.updated_at}</div>
                    </div>
                </Card.Body>
            </Card>
        </motion.div>
    );
};

export default NoteItem;