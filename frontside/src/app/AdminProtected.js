import React from "react";
import { Route, Redirect } from "react-router-dom";
import "../../src/assets/custom.css";
const AdminProtected = ({
  component: Component,
  isAuthenticated,
  isAdmin,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin === "1" ? (
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
};

export default AdminProtected;
