import React from "react";
import { Route, Redirect } from "react-router-dom";
import "../../src/assets/custom.css";
const PublisherProtected = ({
  component: Component,
  isAuthenticated,
  isAdmin,
  publisherReadMessage,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin === "2" ? (
          <Component {...props} publisherReadMessage={publisherReadMessage} />
        ) : (
          <Redirect to="/login" />         
        )
      }
    />
  );
};

export default PublisherProtected;
