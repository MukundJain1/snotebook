import React from 'react';
import { Container } from 'react-bootstrap';
import { StickyNote } from 'lucide-react';
import { motion } from 'framer-motion';

const NoNotes = () => {
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center py-5"
      style={{ minHeight: '75vh' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(145deg, #fff8e1, #f3e5ab)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
          padding: '3rem 2rem',
          borderRadius: '1rem',
          border: '1px solid #e6c36b',
          textAlign: 'center',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        <StickyNote size={80} color="#bfa435" className="mb-4" />
        <h2 style={{ fontWeight: '700', color: '#8d6e00', fontFamily: 'Lora, serif' }}>No Notes Yet</h2>
        <p style={{ color: '#a17f1f', fontStyle: 'italic', fontSize: '1.1rem' }}>
          Your notebook is waiting to be filled with golden thoughts.
        </p>
      </motion.div>
    </Container>
  );
};

export default NoNotes;