import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './sidebar.style.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSelectMenu = (url) => {
    navigate(url);
  };

  return (
    <div className="admin-sidebar">
      <Link to="/">
        <div>What’s in your fridge</div>
      </Link>
      <div className="admin-sidebar-title">Admin Account</div>
      <ul className="admin-sidebar-area">
        <li
          className="admin-sidebar-item"
          onClick={() => handleSelectMenu("/admin/recipe?page=1")}
        >
          Recipe
        </li>
        <li
          className="admin-sidebar-item"
          onClick={() => handleSelectMenu("/admin/ingredients?page=1")}
        >
          Ingredients
        </li>
        <li
          className="admin-sidebar-item"
          onClick={() => handleSelectMenu("/admin/order?page=1")}
        >
          Order
        </li>
        <li
          className="admin-sidebar-item"
          onClick={() => handleSelectMenu("/admin/user?page=1")}
        >
          User
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
