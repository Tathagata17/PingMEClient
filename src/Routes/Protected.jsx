import React from "react";

import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); 

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // redirect to login
  }

  return children;
};

export default Protected