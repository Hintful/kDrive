import React from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from "../contexts/AuthContext";
import { MemoryRouter as Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Signin from './Signin';
import PrivateRoute from './PrivateRoute';
import PasswordReset from './PasswordReset';
import UpdateProfile from './UpdateProfile';

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Router basename={process.env.PUBLIC_URL}>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
              <Route path="/reset" component={PasswordReset} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
            </Switch>  
          </AuthProvider>
        </Router>    
      </div>
    </Container>
  )
}

export default App;
