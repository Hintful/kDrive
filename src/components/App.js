import React, { useEffect } from 'react';
import Signup from './auth/Signup';
import { AuthProvider } from "../contexts/AuthContext";
// import {  } from 'react-router';
import { Switch, Route, useLocation } from 'react-router-dom';
import Profile from './auth/Profile';
import Signin from './auth/Signin';
import PrivateRoute from './auth/PrivateRoute';
import PasswordReset from './auth/PasswordReset';
import UpdateProfile from './auth/UpdateProfile';
import Dashboard from './drive/Dashboard';
import ReactGA from 'react-ga';

function usePageViews() {
  let pvLocation = useLocation();
  useEffect(() => {
    if(!window.GA_INIT) {
      ReactGA.initialize("UA-186165133-1");
      window.GA_INIT = true;
    }
    ReactGA.set({ page: pvLocation.pathname });
    ReactGA.pageview(pvLocation.pathname);
  }, [pvLocation]);
}

function App() {
  usePageViews();

  return (
    <AuthProvider>
      <Switch>
        { /* Drive Components */ }
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

        { /* Profile Components */ }
        <PrivateRoute path="/user" component={Profile} />
        <PrivateRoute path="/update-profile" component={UpdateProfile} />

        { /* Authentication Components */ }
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/reset" component={PasswordReset} />
        
      </Switch>  
    </AuthProvider>
  )
}

export default App;
