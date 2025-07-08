import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const Signin = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cred, setCred] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cred.email, password: cred.password })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      props.showAlert('Invalid Entries', 'danger');
    }
    else {
      console.log(json.token)
      localStorage.setItem('token', json.token);
      navigate('/');
      props.showAlert('Logged In Successfully', 'success');
    }
    setCred({ email: "", password: "" });
  }

  const onchange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f0f2f5', height: 'calc(100vh - 56px)' }}>
      <motion.div
        className="p-5 rounded-4 shadow bg-white w-100" style={{ maxWidth: '420px', border: '1px solid #e0e0e0' }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-center mb-4" style={{ color: '#0b3d91' }}>Sign In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name='email'
              value={cred.email}
              onChange={onchange}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name='password'
              value={cred.password}
              onChange={onchange}
              placeholder="Password"
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </motion.div>
    </div>
  );
};

export default Signin;