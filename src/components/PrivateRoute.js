import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...otherComponents }) => {
  const { currentUser } = useAuth();

  return (  
    <Route
      {...otherComponents}
      render = {props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/signin" />
      }}
    >

    </Route>
  );
}
 
export default PrivateRoute;