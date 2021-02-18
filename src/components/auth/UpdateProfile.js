import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import CenteredContainer from '../CenteredContainer';

export default function UpdateProfile() {
  const emailRef = useRef();
  const pwRef = useRef();
  const pwConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (pwRef.current.value !== pwConfirmRef.current.value) {
      // pw does not match pwConfirm
      toast.error("Passwords do not match!", { duration: 3000 });
      return;
    }

    const handlePromises = []; // init
    setError(""); // Reset
    setLoading(true);

    if (emailRef.current.Value !== currentUser.email) {
      handlePromises.push(updateEmail(emailRef.current.value));
    }

    if (pwRef.current.value) { // already guaranteed that pw/pwRef match
      handlePromises.push(updatePassword(pwRef.current.value));
    }

    Promise.all(handlePromises).then(() => {
      toast.success("Profile successfully updated!", { duration: 1500 });
      setTimeout(() => {
        history.push('/user');
        setLoading(false)
      }, 1500);
    }).catch(() => {
      toast.error("Profile update failed.", { duration: 4000 });
    }).finally(() => {
    });
  }
    
  return (
    <CenteredContainer>
      <Toaster />
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">Update Profile</h3>
          { error && 
            <Alert variant="danger">{error}</Alert>
          }
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={ currentUser.email } />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={pwRef} placeholder="Leave blank to keep the same password" />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={pwConfirmRef} placeholder="Leave blank to keep the same password" />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Go back</Link>
      </div>  
    </CenteredContainer>
  )
}
