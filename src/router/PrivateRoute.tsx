import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  permissionLevel: string;
}

const PrivateRoute = ({permissionLevel}: PrivateRouteProps) => {
  const user = { level: "admin" };
  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
