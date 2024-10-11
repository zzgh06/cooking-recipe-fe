import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { text: "DashBoard", url: "/admin/dashboard" },
    { text: "Recipe", url: "/admin/recipe?page=1" },
    { text: "Ingredients", url: "/admin/ingredients?page=1" },
    { text: "Order", url: "/admin/order?page=1" },
    { text: "User", url: "/admin/user?page=1" },
  ];

  const handleSelectMenu = (url: string) => {
    navigate(url);
    setIsOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between min-h-[64px]">
        <h6
          className="text-lg font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          What's in your fridge
        </h6>
      </div>
      <div className="h-px bg-gray-200 dark:bg-gray-700" />
      <nav className="flex-1">
        <ul className="py-2">
          {menuItems.map((item) => (
            <li key={item.text}>
              <button
                onClick={() => handleSelectMenu(item.url)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        className="flex justify-start ml-3 lg:hidden p-4 focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-60 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out">
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="hidden lg:block w-60 flex-shrink-0">
        <div className="fixed h-full w-60 bg-green-800 text-white shadow-lg">
          <SidebarContent />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
