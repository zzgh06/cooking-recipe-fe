import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Box, Grid, Container, CssBaseline } from "@mui/material";
import Sidebar from "../component/SideBar/SideBar";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import ToastMessage from "../component/ToastMessage/ToastMessage";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

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
          <Grid item xs={12} md={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={9}>
            <Container>{children}</Container>
          </Grid>
        </Grid>
      ) : (
        <>
          <Navbar user={user} />
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
