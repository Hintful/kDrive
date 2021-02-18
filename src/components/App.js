import React from 'react';
import Signup from './auth/Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from "../contexts/AuthContext";
import { MemoryRouter as Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import Profile from './auth/Profile';
import Signin from './auth/Signin';
import PrivateRoute from './auth/PrivateRoute';
import PasswordReset from './auth/PasswordReset';
import UpdateProfile from './auth/UpdateProfile';
import CenteredContainer from './CenteredContainer';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Profile} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/reset" component={PasswordReset} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
        </Switch>  
      </AuthProvider>
    </Router>
  )
}

export default App;
