import React from "react";
import { Route, Redirect } from "react-router-dom";
import "../../src/assets/custom.css";
const AuthProtected = ({
  component: Component,
  isAuthenticated,
  isAdmin,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
        // <div>
        //   <h1>Unauthorized Access</h1>
        //   <p>You do not have permission to access this page.</p>
        // </div>
      )
    }
  />
);

export default AuthProtected;
