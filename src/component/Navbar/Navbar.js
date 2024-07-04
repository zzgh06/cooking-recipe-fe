import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  faBars,
  faCartPlus,
  faClose,
  faUtensils,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../Navbar/Navbar.style.css";
import { logout } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [query, setQuery] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get("name") || "");
  const [isSearchVisible, setSearchVisible] = useState(false);

  const menuList = ["레시피", "스토어", "My 냉장고"];
  const menuPathMapping = {
    레시피: "recipes/all",
    스토어: "store",
    "My 냉장고": "fridge",
  };

  const user = useSelector((state) => state.auth.user);

  console.log("user", user)

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return navigate(`/`);
      }
      navigate(`/search?name=${event.target.value}`); 
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible); // Toggle search visibility
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
          <div className="user-information">
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
      <div className="nav-middle" onMouseLeave={hideDropdown}>
        <div className="nav-logo" onClick={() => navigate("/")} onMouseEnter={showDropdown}>
          What’s in your fridge
        </div>

        <div className="nav-menu">
          {menuList.map((menu, index) => (
            <li key={index}>
              <Link
                to={`/${menuPathMapping[menu]}`}
                key={index}
              >
                {menu}
              </Link>
            </li>
          ))}
        </div>
        <div className="search-box-container">
          {isSearchVisible && (
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyPress={onCheckEnter}
            />
          )}
          <FontAwesomeIcon
            className="search-icon"
            icon={faSearch}
            onClick={toggleSearch}
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

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <FontAwesomeIcon icon={faClose} onClick={toggleSidebar} />
          <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyPress={onCheckEnter}
            />
        </div>
        <div className="sidebar-menu">
          {menuList.map((menu, index) => (
            <Link
              to={`/${menuPathMapping[menu]}`}
              key={index}
              onClick={toggleSidebar}
            >
              {menu}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
