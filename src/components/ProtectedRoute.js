// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // Usamos Navigate y Outlet
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth(); // Usamos el contexto de autenticación

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
