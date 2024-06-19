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
      <Link to="/">Category 1</Link>
      <Link to="/">Category 2</Link>
      <Link to="/">Category 3</Link>
      <Link to="/">Category 4</Link>
    </div>
  );
};

export default Dropdown;
