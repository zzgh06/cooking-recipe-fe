import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({permissionLevel}) => {
  const user = { level: "admin" };
  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
