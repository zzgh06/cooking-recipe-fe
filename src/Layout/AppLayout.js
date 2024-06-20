import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../component/SideBar/Sidebar";
import Navbar from "../component/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../component/Footer/Footer";
import { loginWithToken } from "../redux/userSlice";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);
  
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    console.log("Current location:", location.pathname);
  }, [location]);

  return (
    <div>
      {location.pathname.includes("admin") ? (
        <Row className="vh-100">
          <Col xs={12} md={3}>
            <Sidebar />
          </Col>
          <Col xs={12} md={9}>
            {children}
          </Col>
        </Row>
      ) : (
        <>
          <Navbar user={user} />
          {children}
          <Footer />
        </>
      )}
      
    </div>
  );
};

export default AppLayout;
