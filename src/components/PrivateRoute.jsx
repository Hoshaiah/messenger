// PrivateRoute.js
import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Element {...props} /> : <Navigate to="/login" />
    }
  />
);

export default PrivateRoute;
