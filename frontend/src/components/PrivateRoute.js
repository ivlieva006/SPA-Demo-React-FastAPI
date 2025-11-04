import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // если не залогинен — отправляем на /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // если залогинен — показываем содержимое
  return children;
};

export default PrivateRoute;