import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCartPlus,
  faClose,
  faUtensils,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../Navbar/Navbar.style.css";

import Dropdown from "./Dropdown";
import { logout } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });
  const menuList = ["레시피", "스토어", "베스트", "My 냉장고"];
  const menuPathMapping = {
    레시피: "recipe",
    스토어: "store",
    베스트: "best",
    "My 냉장고": "fridge",
  };

  const user = useSelector((state) => state.auth.user);
   

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return navigate(`/`);
      }
      navigate(`?name=${event.target.value}`);
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
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
        {user && user?.user.level === "admin" && (
          <Link to="/admin/recipe" className="admin-link">
            Admin page
          </Link>
        )}
        {user ? (
          <div className="user-info">
            <span>{user?.user.name}님 </span>
            <span onClick={handleLogout}>로그아웃</span>
          </div>
        ) : (
          <>
            <div className="register" onClick={() => navigate("/register")}>
              <span>회원가입</span>
            </div>
            <div className="login" onClick={() => navigate("/login")}>
              <span>로그인</span>
            </div>
          </>
        )}
      </div>
      <div className="nav-middle">
        <div className="nav-logo" onClick={() => navigate("/")}>
          What’s in your fridge
        </div>
        <div className="search-box-container">
          <SearchBox
            name={"search-box"}
            onCheckEnter={onCheckEnter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="user-menu">
          <FontAwesomeIcon
            className="nav-icon"
            icon={faUser}
            onClick={() => navigate("/account/profile")}
          />
          <FontAwesomeIcon 
            className="nav-icon" 
            icon={faUtensils} 
            onClick={() => navigate("/account/recipe")}
          />
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
        <div className="nav-category" onMouseEnter={showDropdown}>
          <FontAwesomeIcon icon={faBars} />
          <span>카테고리</span>
        </div>
        <div className="nav-menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <Link
                to={`/${menuPathMapping[menu]}`}
                key={index}
                onClick={toggleSidebar}
              >
                {menu}
              </Link>
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
