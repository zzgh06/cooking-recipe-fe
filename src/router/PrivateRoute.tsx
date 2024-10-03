import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import { setToastMessage } from "../redux/commonUISlice";
import { useLoginWithToken } from "../hooks/User/useLoginWithToken";

interface PrivateRouteProps {
  permissionLevel: string;
}

const PrivateRoute = ({ permissionLevel }: PrivateRouteProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate: fetchUser } = useLoginWithToken();
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token && !user) {
      fetchUser();
    }
  }, []);

  if (!sessionStorage.getItem('token')) {
    dispatch(
      setToastMessage({
        message: "로그인이 필요한 서비스 입니다.",
        status: "error",
      })
    );
    return <Navigate to="/login" />;
  }

  if (!user) {
    return null; 
  }

  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;