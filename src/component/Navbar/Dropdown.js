import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({
  category,
  dropdownVisible,
  showDropdown,
  hideDropdown,
}) => {
  return (
    <div
      className={`dropdown-content ${dropdownVisible ? "visible" : ""}`}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <Link to="/recipe/category/한식">한식</Link>
      <Link to="/recipe/category/중식">중식</Link>
      <Link to="/recipe/category/일식">일식</Link>
      <Link to="/recipe/category/양식">양식</Link>
      <Link to="/recipe/category/기타">기타</Link>
    </div>
  );
};

export default Dropdown;
