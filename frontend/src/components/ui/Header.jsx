import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Icon from "../AppIcon";
import Button from "./Button";
import { useAuth } from "../../context/AuthContext";
import { User, LogOut } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const navigationItems = [
    { name: "Trang chủ", path: "/", icon: "Home" },
    { name: "Sản phẩm", path: "/product", icon: "Grid3X3" },
    { name: "Giới thiệu", path: "/about", icon: "Info" },
    { name: "Liên hệ", path: "/contact", icon: "MessageCircle" },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 transition-warm hover:opacity-80"
            onClick={closeMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-store-icon lucide-store w-8 h-8 text-orange-600 flex items-center justify-center"
            >
              <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
              <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
              <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
            </svg>
            <span className="font-playfair text-2xl font-bold text-primary">
              Mộc's HOME
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 gap-3">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group relative flex items-center space-x-1 px-2 pt-1 pb-2 rounded-lg transition-warm font-medium ${
                  isActivePath(item?.path)
                    ? "text-orange-600 bg-orange-500/10 after:absolute after:left-2 after:right-2 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-orange-500 after:opacity-100 after:scale-x-100 after:transition-transform after:duration-300"
                    : "text-neutral-600 hover:text-orange-600 hover:bg-orange-400/5 after:absolute after:left-2 after:right-2 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-orange-500 after:opacity-0 after:scale-x-0 after:transition-all after:duration-300 hover:after:opacity-100 hover:after:scale-x-100"
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              iconPosition="left"
              className="text-text-secondary hover:text-primary"
            >
              Search
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="ShoppingCart"
              iconPosition="left"
              className="text-text-secondary hover:text-primary"
            >
              <Link to={"cart"}>Cart</Link>
            </Button>

            {user && user.role !== "admin" ? (
              <div className="relative group">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <User size={16} />
                  <span>{user.ten_hoc_ten || user.ten_dang_nhap}</span>
                </Button>
                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Tài khoản của tôi
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={toggleMobileMenu}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
          />
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-slide-down">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-warm font-medium ${
                    isActivePath(item?.path)
                      ? "text-orange-600 bg-orange-500/10"
                      : "text-neutral-600 hover:text-orange-600 hover:bg-orange-400/5"
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-border space-y-2">
                <button className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg transition-warm font-medium text-text-secondary hover:text-primary hover:bg-primary/5">
                  <Icon name="Search" size={20} />
                  <span>Search</span>
                </button>
                <Link className="flex gap-3">
                  <button className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg transition-warm font-medium text-text-secondary hover:text-primary hover:bg-primary/5">
                    <Icon name="ShoppingCart" size={20} />
                    <span>Cart</span>
                  </button>
                </Link>

                {/* LOGIC HIỂN THỊ ĐỘNG CHO MOBILE */}
                {user && user.role !== "admin" ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg transition-warm font-medium text-red-600 hover:text-red-600 hover:bg-red-400/5"
                  >
                    <LogOut size={20} />
                    <span>Đăng xuất</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block px-4 py-2"
                  >
                    <Button variant="outline" size="sm" fullWidth>
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
