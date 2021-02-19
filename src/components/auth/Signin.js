import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import CenteredContainer from '../CenteredContainer';
import ReactGA from 'react-ga';

export default function Signin() {
  const emailRef = useRef();
  const pwRef = useRef();
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      setError(""); // Reset
      setLoading(true);
      await signIn(emailRef.current.value, pwRef.current.value);
      toast.success("Signed in!", { duration: 1500 });
      setTimeout(() => {
        history.push("/"); // redirect to dashboard page once successful
        setLoading(false);
      }, 1500);
    } catch {
      toast.error("Failed to sign in.", { duration: 3000 });
    }
    setLoading(false);
  }
    
  return (
    <CenteredContainer>
      <Toaster />
      <h1 className="text-center mb-5 title"><span className="emphasis"><i class="fas fa-code title-logo"></i> k</span>Drive</h1>
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">Sign In</h3>
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
            <Button disabled={loading} type="submit" className="w-100"
              onClick={() => {
                ReactGA.event({
                  category: 'kDrive',
                  action: 'Clicked Sign In button'
                });
              }}
            >Sign In</Button>
          </Form>
          <div className="w-100 text-center mt-4">
            <Link to="/reset">Forgot password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>  
    </CenteredContainer>
  )
}
