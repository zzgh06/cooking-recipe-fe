import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ permissionLevel }) => {
  console.log("privateroute")
  // const user = useSelector((state) => state.auth.user);

  const user = { level: "admin" };
  console.log("PrivateRoute user", user)

  if (!user) {
    console.log("User not found or not logged in");
  }

  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
