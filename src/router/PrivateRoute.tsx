import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import { useLoginWithToken } from "../hooks/User/useLoginWithToken";
import { CircularProgress } from "@mui/material";

interface PrivateRouteProps {
  permissionLevel: string;
}

const PrivateRoute = ({permissionLevel}: PrivateRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate: fetchUser } = useLoginWithToken();
  
  useEffect(()=>{
    fetchUser();
  }, [])

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }
  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
