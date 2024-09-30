import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  permissionLevel: string;
}

const PrivateRoute = ({permissionLevel}: PrivateRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
