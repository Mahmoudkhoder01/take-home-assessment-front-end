import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
  const storedToken = localStorage.getItem("token");

  // Check if the user is authenticated based on the presence of a token in localStorage
  const isAuthenticated: boolean = !!storedToken && JSON.parse(storedToken);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
