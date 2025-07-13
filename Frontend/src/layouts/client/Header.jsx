import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import logomain from "../../assets/images/logo_withtagline.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isCategoryPage = location.pathname === "/category";
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed !== "") {
      navigate(`/category?search=${encodeURIComponent(trimmed)}`);
      setIsMenuOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setSearchTerm("");
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 w-full bg-green-600 shadow-lg z-50">
      {isMenuOpen && (
        <div
          className="lg:hidden fixed top-[67px] left-0 w-full h-[calc(100vh-72px)] bg-green-600 -z-10 flex flex-col items-center justify-start p-6 space-y-4 transform transition-transform duration-500 ease-in-out animate-slideDown"
          style={{
            transform: isMenuOpen ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          {user && (
            <button className="cursor-pointer flex flex-col items-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                alt="Ảnh đại diện"
                className="w-16"
              />
              <span className="text-white mt-4 text-[18px] font-semibold">
                Chào, {user.name}
              </span>
            </button>
          )}
          {!isCategoryPage && (
            <div className="w-full max-w-md flex items-center justify-between bg-white rounded-lg shadow-md">
              <input
                type="text"
                placeholder="Nhập tìm kiếm..."
                className="px-5 py-3 outline-0 w-full rounded-l-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSearch}
                className="text-green-800 cursor-pointer px-5 py-3 rounded-r-lg whitespace-nowrap font-bold hover:bg-green-100 transition-colors"
              >
                Tìm kiếm
              </button>
            </div>
          )}
          <Link
            to="/category"
            className="text-[15px] border w-full max-w-md text-center cursor-pointer px-4 py-3 pt-4 rounded-lg text-white uppercase font-bold border-b-3 border-white shadow-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Danh mục sách
          </Link>
          <Link
            to=""
            className="text-[15px] border w-full max-w-md text-center cursor-pointer px-4 py-3 pt-4 rounded-lg text-white uppercase font-bold border-b-3 border-white shadow-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Giỏ hàng
          </Link>
          {!user && (
            <Link
              to="/login"
              className="text-[15px] border w-full max-w-md text-center cursor-pointer px-4 py-3 pt-4 text-white rounded-lg uppercase font-bold border-b-3 border-white shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Đăng nhập / Đăng ký
            </Link>
          )}
          {user && (
            <>
              <Link
                to="/view-history"
                className="text-[15px] border w-full max-w-md text-center cursor-pointer px-4 py-3 pt-4 text-white rounded-lg uppercase font-bold border-b-3 border-white shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Lịch sử xem
              </Link>
              <Link
                to="/favorites"
                className="text-[15px] border w-full max-w-md text-center cursor-pointer px-4 py-3 pt-4 text-white rounded-lg uppercase font-bold border-b-3 border-white shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Yêu thích
              </Link>
              <button
                onClick={handleLogout}
                className="text-[15px] border w-full max-w-md text-center cursor-pointer px-4 py-3 pt-4 rounded-lg text-white uppercase font-bold border-b-3 border-white shadow-md"
              >
                Đăng xuất
              </button>
            </>
          )}
        </div>
      )}
      <div className="flex items-center justify-between p-4 mx-auto max-w-screen-xl text-sm font-semibold z-50">
        <div className="flex items-center space-x-4 grow z-50">
          <Link to="/">
            <img src={logomain} alt="Logo" className="h-10 cursor-pointer" />
          </Link>
          {!isCategoryPage && (
            <div className="grow lg:flex items-center justify-between space-x-4 ml-5 hidden bg-white rounded-lg max-w-2xl shadow-sm">
              <input
                type="text"
                placeholder="Nhập tìm kiếm..."
                className="px-5 py-2 outline-0 grow rounded-l-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSearch}
                className="text-green-800 cursor-pointer px-5 py-3 rounded-r-lg whitespace-nowrap font-bold hover:bg-green-100 transition-colors"
              >
                Tìm kiếm
              </button>
            </div>
          )}
        </div>
        <div className="lg:flex hidden items-center space-x-4 ml-4 z-50">
          <Link
            to="/category"
            className="text-[15px] cursor-pointer px-4 py-2 pt-3 bg-blue-400 rounded-2xl text-white uppercase font-bold border-b-4 border-blue-600 hover:bg-blue-500 transition-colors"
          >
            Danh mục sách
          </Link>
          {user ? (
            <div className="relative group cursor-pointer">
              <div className="flex items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                  alt="Ảnh đại diện"
                  className="w-11"
                />
                <span className="text-white ml-3 text-[16px]">{user.name}</span>
              </div>

              <div className="absolute top-[37px] right-1/2 mt-2 overflow-hidden bg-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 transform translate-x-1/2">
                <Link
                  to="/view-history"
                  className="block px-8 py-2 pt-3 text-[15px] text-gray-700 hover:bg-gray-100 text-nowrap cursor-pointer"
                >
                  Lịch sử xem
                </Link>
                <Link
                  to="/favorites"
                  className="block px-8 py-2 pt-3 text-[15px] text-gray-700 hover:bg-gray-100 text-nowrap cursor-pointer"
                >
                  Yêu thích
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-8 py-2 pt-3 text-[15px] text-gray-700 hover:bg-gray-100 text-nowrap cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-[15px] cursor-pointer px-4 py-2 pt-3 bg-white rounded-2xl text-green-600 uppercase font-bold border-b-4 border-green-300 hover:bg-green-50 transition-colors"
            >
              Đăng nhập
            </Link>
          )}
          <button className="cursor-pointer sm:block hidden">
            <span className="text-4xl text-white hover:text-green-200 transition-colors">
              <IoCartOutline />
            </span>
          </button>
        </div>
        <button
          className="flex lg:hidden text-white text-4xl cursor-pointer hover:text-green-200 transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>
    </header>
  );
};

export default Header;
