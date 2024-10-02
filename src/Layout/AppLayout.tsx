import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router";
import { Box, Grid, Container, CssBaseline } from "@mui/material";
import Sidebar from "../component/SideBar/SideBar";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import ToastMessage from "../component/ToastMessage/ToastMessage";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  useEffect(() => {
    console.log("Current location:", location.pathname);
  }, [location]);

  const isAdminPage = location.pathname.includes("admin");

  return (
    <Box>
      <CssBaseline />
      <ToastMessage />
      {isAdminPage ? (
        <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
          <Grid item xs={12} lg={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} lg={10}>
            <Container>{children}</Container>
          </Grid>
        </Grid>
      ) : (
        <>
          <Navbar />
          <Box component="main" sx={{ paddingTop: "80px" }}>
            {children}
          </Box>
          <Footer />
        </>
      )}
    </Box>
  );
};

export default AppLayout;