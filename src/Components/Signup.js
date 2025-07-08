import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = (props) => {
  const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      props.showAlert('Invalid Credentials', 'danger');
    } else {
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert('Signed In Successfully', 'success');
    }
    setCred({ name: "", email: "", password: "", cpassword: "" });
  };

  const onchange = (e) => setCred({ ...cred, [e.target.name]: e.target.value });

  return (
    <Container className="d-flex justify-content-center align-items-center bg-light" style={{ height: 'calc(100vh - 56px)' }}>
      <motion.div
        className="w-100"
        style={{ maxWidth: '450px' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card className="shadow-sm rounded-3">
          <Card.Body className="p-4">
            <h2 className="mb-4 text-center text-primary">Create Account</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={cred.name}
                  onChange={onchange}
                  placeholder="Enter your full name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={cred.email}
                  onChange={onchange}
                  placeholder="Enter your email"
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={cred.password}
                  onChange={onchange}
                  placeholder="Enter password"
                  minLength={5}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formCPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="cpassword"
                  value={cred.cpassword}
                  onChange={onchange}
                  placeholder="Confirm password"
                  minLength={5}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" size="lg">
                  Sign Up
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Signup;
