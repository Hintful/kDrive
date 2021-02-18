import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import CenteredContainer from '../CenteredContainer';

const Profile = () => {

  async function handleSignOut() {
    setError(""); // reset

    try {
      await signOut();
      toast.success("Signed out!", { duration: 1500 });
      setTimeout(() => {
        
      }, 1500);
      history.push("/signin"); // redirect to dashboard page once successful
    } catch {
      toast.error("Failed to sign out.", { duration: 3000 });
    }
    
  }

  const [error, setError] = useState("");
  const { currentUser, signOut } = useAuth();
  const history = useHistory();

  return (  
    <CenteredContainer>
      <Toaster />
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">Profile</h3>
          { error && 
            <Alert variant="danger">{error}</Alert>
          }
          <strong>Email:</strong> { currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleSignOut}>Sign Out</Button>
      </div>  
    </CenteredContainer>
  );
}
 
export default Profile;