import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useLoginWithToken } from "../../hooks/User/useLoginWithToken";
import { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUtensils,
  faCartShopping,
  faMagnifyingGlass,
  faBars,
  faXmark
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const { mutate: fetchUser } = useLoginWithToken();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = () => {
    if (keyword.trim()) {
      navigate(`/search?name=${keyword}`);
      setKeyword("");
    }
  };

  const menuItems = [
    { name: "레시피", path: "recipes/all" },
    { name: "스토어", path: "store" },
    { name: "My 냉장고", path: "fridge" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center py-2 border-b border-emerald-100">
          {user?.level === "admin" && (
            <Link
              to="/admin/dashboard"
              className="mr-4 px-4 py-1.5 bg-emerald-500 text-white rounded-full text-sm font-medium hover:bg-emerald-600 transition-colors"
            >
              Admin page
            </Link>
          )}

          <div className="flex items-center space-x-1">
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gray-700" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                  {user?.name ? (
                    <>
                      <button
                        onClick={() => navigate("/account/profile")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                      >
                        {user.name}님
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                      >
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate("/register")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                      >
                        회원가입
                      </button>
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                      >
                        로그인
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => navigate("/account/recipe")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faUtensils} className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <button
            onClick={() => navigate("/")}
            className="text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors"
          >
            냉장고에 뭐 있지?
          </button>
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                onKeyPress={handleSearch}
                className="w-full py-2 px-4 pl-11 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={`/${item.path}`}
                className="text-gray-700 font-semibold hover:text-emerald-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg z-60">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-lg font-semibold">메뉴</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  value={keyword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                  onKeyPress={handleSearch}
                  className="w-full py-2 px-4 pl-11 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={`/${item.path}`}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
