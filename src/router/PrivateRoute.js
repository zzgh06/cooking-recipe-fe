import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ permissionLevel }) => {
  // const user = useSelector((state) => state.auth.user);

  const user = { level: "admin" };
  console.log("PrivateRoute user", permissionLevel)

  if (!user) {
    console.log("User not found or not logged in");
  }

  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  console.log(isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
