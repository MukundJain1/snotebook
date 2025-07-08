import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BookOpen, Edit2, Calendar, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="mb-3" size={36} />,
    title: 'Organize Effortlessly',
    description: 'Group notes into notebooks, tag them with colors, and find anything in seconds.'
  },
  {
    icon: <Edit2 className="mb-3" size={36} />,
    title: 'Rich Editing Tools',
    description: 'Markdown support, inline images, code highlighting — write the way you think.'
  },
  {
    icon: <Calendar className="mb-3" size={36} />,
    title: 'Timeline Insights',
    description: 'See your note history and track your productivity over days, weeks, and months.'
  },
  {
    icon: <ShieldCheck className="mb-3" size={36} />,
    title: 'Secure & Private',
    description: 'End-to-end encryption keeps your thoughts safe. Only you can read your notes.'
  }
];

export default function About() {
  return (
    <motion.section
      className="py-5 bg-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="display-5 fw-bold">Why Choose <span className="text-primary">sNoteBook</span>?</h2>
          <p className="text-muted">Everything you need to capture ideas, stay organized, and boost productivity.</p>
        </motion.div>

        <Row xs={1} sm={2} md={2} lg={4} className="g-4">
          {features.map((feat, idx) => (
            <Col key={idx}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * idx, duration: 0.5 }}
              >
                <Card className="h-100 shadow-sm border-0 rounded-3 text-center p-4">
                  <div className="text-primary mb-3">
                    {feat.icon}
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold mb-2">{feat.title}</Card.Title>
                    <Card.Text className="text-muted small">
                      {feat.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
}
