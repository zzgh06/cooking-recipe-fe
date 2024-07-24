import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../component/SideBar/SideBar";
import Navbar from "../component/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../component/Footer/Footer";
import ToastMessage from "../component/ToastMessage/ToastMessage";
import { useLoginWithToken } from "../hooks/User/useLoginWithToken";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { mutate: loginWithToken } = useLoginWithToken();
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);

  useEffect(() => {
    loginWithToken();
  }, [loginWithToken]);

  useEffect(() => {
    console.log("Current location:", location.pathname);
  }, [location]);

  useEffect(() => {
    const viewedItems =
      JSON.parse(localStorage.getItem("viewedIngredients")) || [];
    setRecentlyViewedItems(viewedItems);
  }, [location]);

  return (
    <div>
      <ToastMessage />
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
          <div className="layout">{children}</div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default AppLayout;
