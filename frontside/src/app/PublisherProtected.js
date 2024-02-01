import React from "react";
import { Route, Redirect } from "react-router-dom";
import "../../src/assets/custom.css";
const PublisherProtected = ({
  component: Component,
  isAuthenticated,
  isAdmin,
  publisherReadMessage,
  publisherUnreadMessageCount,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin === "2" ? (
          <Component {...props} publisherReadMessage={publisherReadMessage} publisherUnreadMessageCount={publisherUnreadMessageCount}/>
        ) : (
          <Redirect to="/login" />         
        )
      }
    />
  );
};

export default PublisherProtected;
