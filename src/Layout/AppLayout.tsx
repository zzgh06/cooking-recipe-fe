import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router";
import { useLoginWithToken } from "../hooks/User/useLoginWithToken";
import Sidebar from "../component/SideBar/SideBar";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import ToastMessage from "../component/ToastMessage/ToastMessage";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { mutate: fetchUser } = useLoginWithToken();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    console.log("Current location:", location.pathname);
  }, [location]);


  const isAdminPage = location.pathname.includes("admin");

  return (
    <div className="min-h-screen">
      <ToastMessage />
      {isAdminPage ? (
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="lg:w-1/6">
            <Sidebar />
          </div>
          <div className="flex-1 lg:w-5/6">
            <div className="container mx-auto">{children}</div>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="pt-32">{children}</main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default AppLayout;
