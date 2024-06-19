import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCartPlus,
  faClose,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "../Navbar/Navbar.style.css";
import SearchBox from "./SearchBox";
import Dropdown from "./Dropdown";

const Navbar = ({ user }) => {  
  const navigate = useNavigate();
  const menuList = ["스토어", "레시피", "베스트", "My 냉장고"];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return navigate("/");
      }
      // navigate(`?name=${event.target.value}`);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="nav">
      <div className="nav-top">
        <div className="register" onClick={() => navigate("/register")}>
          <span>회원가입</span>
        </div>
        <div onClick={() => navigate("/login")}>
          <span>로그인</span>
        </div>
      </div>
      <div className="nav-middle">
        <div className="nav-logo" onClick={() => navigate("/")}>
          What’s in your fridge
        </div>
        <SearchBox name={"search-box"} onCheckEnter={onCheckEnter} />
        <div className="user-menu">
          <FontAwesomeIcon className="nav-icon" icon={faLocationDot} />
          <FontAwesomeIcon className="nav-icon" icon={faHeart} />
          <FontAwesomeIcon
            className="nav-icon"
            icon={faCartPlus}
            onClick={() => navigate("/cart")}
          />
        </div>
        <div className="sidebar-toggle">
          <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
        </div>
      </div>
      <div className="nav-bottom" onMouseLeave={hideDropdown}>
        <div className="nav-category" onMouseEnter={showDropdown} >
          <FontAwesomeIcon icon={faBars} />
          <span>카테고리</span>
        </div>
        <div className="nav-menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <Link to="/">{menu}</Link>
            </li>
          ))}
        </div>
        <Dropdown
          dropdownVisible={dropdownVisible}
          showDropdown={showDropdown}
          hideDropdown={hideDropdown}
        />
      </div>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <FontAwesomeIcon icon={faClose} onClick={toggleSidebar} />
          <SearchBox name={"sidebar-search-box"} onCheckEnter={onCheckEnter} />
        </div>
        <div className="sidebar-menu">
          {menuList.map((menu, index) => (
            <Link to="/" key={index} onClick={toggleSidebar}>
              {menu}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
