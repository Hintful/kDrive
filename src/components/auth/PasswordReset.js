import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CenteredContainer from '../CenteredContainer';
import ReactGA from 'react-ga';

export default function PasswordReset() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      setError(""); // Reset
      setLoading(true);
      await resetPassword(emailRef.current.value);
      toast.success("Password reset e-mail has been sent!", { duration: 4000 });
    } catch {
      setError("Please double check the E-mail address.");
    }
    setLoading(false);
  }
    
  return (
    <CenteredContainer>
      <Toaster />
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">Reset Password</h3>
          { error && 
            <Alert variant="danger">{error}</Alert>
          }
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100"
              onClick={() => {
                ReactGA.event({
                  category: 'kDrive',
                  action: 'Clicked Reset Password button'
                });
              }}
            >Reset Password</Button>
          </Form>
          <div className="w-100 text-center mt-4">
            <Link to="/signin">Sign In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>  
    </CenteredContainer>
  )
}
