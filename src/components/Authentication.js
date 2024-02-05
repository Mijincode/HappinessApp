import React from "react";
import { Navigate } from "react-router-dom";

const Authentication = (Component, isLoggedIn) => {
  return (props) => {
    if (isLoggedIn) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/login" />;
    }
  };
};

export default Authentication;
