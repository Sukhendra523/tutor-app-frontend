import React from "react";
import { Redirect, Route } from "react-router-dom";

const RegisterPrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const mobileAuthToken = localStorage.getItem("mobileAuthToken");
        if (mobileAuthToken) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default RegisterPrivateRoute;
