import React from "react";
import { Redirect, Route } from "react-router-dom";

const TutorRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = localStorage.getItem("token");

        if (token) {
          const { _id, role } = JSON.parse(localStorage.getItem("user"));

          if (role === "tutor") {
            return <Component {...props} />;
          } else {
            if (role === "student") {
              return <Redirect to={`/s/${_id}`} />;
            }
            if (role === "admin") {
              return <Redirect to={`/a/${_id}`} />;
            }
          }
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default TutorRoute;
