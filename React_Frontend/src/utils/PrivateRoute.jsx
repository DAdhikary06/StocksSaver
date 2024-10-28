import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthHandler from './Authhandler';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        element={AuthHandler.loggedIn() ? <Component {...rest} /> : <Navigate to="/" />}
      />
    );
  };

export default PrivateRoute;