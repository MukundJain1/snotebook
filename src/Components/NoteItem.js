import React, { useContext, useState, useMemo } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Trash2, Edit2, Pin } from 'lucide-react';
import NoteContext from '../Context/Notes/noteContext';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css'; // your CSS file with .note-card styles

const PAGE_SIZE = 250;

const NoteItem = (props) => {
  const { deleteNote } = useContext(NoteContext);
  const { note, updateNote } = props;
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    if (!note.content) return [''];
    const chunks = [];
    let start = 0;
    while (start < note.content.length) {
      chunks.push(note.content.slice(start, start + PAGE_SIZE));
      start += PAGE_SIZE;
    }
    return chunks;
  }, [note.content]);

  const handleDelete = (id) => {
    deleteNote(id);
    props.showAlert('Deleted the Note', 'danger');
  };

  const handleNext = () => setPage((p) => Math.min(p + 1, pages.length - 1));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <motion.div
      className="note-card"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.05,
        zIndex: 10,
        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
      }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="ruled-paper"
        style={{
          width: '100%',
          height: '100%',
          color: '#333',
          overflow: 'hidden',
          paddingTop: '3rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Pin */}
        <Pin
          size={24}
          className="position-absolute"
          style={{
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-20deg)',
            color: '#d33',
          }}
        />

        {/* Card Body */}
        <Card.Body
          style={{
            padding: '1rem 1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Tags */}
          {note.tags && note.tags.length > 0 && (
            <div className="mb-2">
              {note.tags.map((tag) => (
                <Badge key={tag} bg="secondary" className="me-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <Card.Title className="mb-2 text-center fw-bold fs-4">
            {note.title}
          </Card.Title>

          {/* Description */}
          <Card.Subtitle className="mb-3 text-muted text-center fst-italic">
            {note.description}
          </Card.Subtitle>

          {/* Content area */}
          <div style={{ flexGrow: 1, overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card.Text
                  style={{
                    textAlign: 'justify',
                    lineHeight: '1.6rem',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {pages[page]}
                </Card.Text>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {pages.length > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handlePrev}
                disabled={page === 0}
              >
                ‹ Prev
              </Button>
              <span style={{ fontSize: '0.85rem' }}>
                Page {page + 1} of {pages.length}
              </span>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleNext}
                disabled={page === pages.length - 1}
              >
                Next ›
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-3">
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
        </Card.Body>

        {/* Footer (Created/Updated info) */}
        <div
          className="position-absolute text-muted"
          style={{
            fontSize: '0.75rem',
            bottom: '0.5rem',
            left: '1rem',
            fontStyle: 'italic',
          }}
        >
          <div><strong>Created:</strong> {note.created_at}</div>
          <div><strong>Updated:</strong> {note.updated_at}</div>
        </div>
      </Card>
    </motion.div>
  );
};

export default NoteItem;
