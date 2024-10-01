import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";
import { setToastMessage } from "../redux/commonUISlice";

interface PrivateRouteProps {
  permissionLevel: string;
}

const PrivateRoute = ({ permissionLevel }: PrivateRouteProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
 
  if (!user) {
    dispatch(
      setToastMessage({
        message: "로그인이 필요한 서비스 입니다.",
        status: "error",
      })
    );
  }

  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
