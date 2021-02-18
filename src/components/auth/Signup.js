import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import CenteredContainer from '../CenteredContainer';

export default function Signup() {
  const emailRef = useRef();
  const pwRef = useRef();
  const pwConfirmRef = useRef();
  const { signUp, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (pwRef.current.value !== pwConfirmRef.current.value) {
      // pw does not match pwConfirm
      toast.error("Passwords do not match!", { duration: 3000 });
      return;
    }

  
    try {
      setError(""); // Reset
      setLoading(true);
      await signUp(emailRef.current.value, pwRef.current.value);
      toast.success("Account created!", { duration: 1500 });
      setTimeout(() => {
        history.push("/"); // redirect to dashboard page once successful
      }, 1500);
    } catch {
      toast.error("Failed to create account.", { duration: 4000 });
    }
    setLoading(false);
  }
    
  return (
    <CenteredContainer>
      <Toaster />
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">Sign Up</h3>
          { error && 
            <Alert variant="danger">{error}</Alert>
          }
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={pwRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={pwConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/signin">Sign In</Link>
      </div>  
    </CenteredContainer>
  )
}
