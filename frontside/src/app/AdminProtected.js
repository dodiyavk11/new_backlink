import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminProtected = ({ component: Component, isAuthenticated,isAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminProtected;
