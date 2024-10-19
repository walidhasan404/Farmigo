import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Components/Avatar/Avatar";
import { useAuth } from "../../Authentication/AuthProvider/AuthContext";
import UserNavigationPanel from "./UserNavigationPanel";
import CartButton from "../Button/CartButton";
import LanguageShift from "../../i18n/hooks/useTranslation";  // Your language translation logic
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { userAuth } = useAuth();
  const token = userAuth?.token;
  const profile_img = 'https://i.ibb.co.com/TWX0wPv/images-4.png';
  const { t } = useTranslation();
  const [userNavPanel, setUserNavPanel] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleUserNavPanel = () => {
    setUserNavPanel((prev) => !prev);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-4">
              <img
                className="w-auto h-8"
                src="https://www.farmioagri.com/cdn/shop/files/vinayakk.png?v=1717508736&width=500"
                alt="FarmiGo Logo"
              />
              <h1 className="text-2xl font-bold">FarmiGo</h1>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            <Link
              to="/"
              className="text-base text-black hover:text-opacity-80 transition-all duration-200"
            >
              {t('home')}
            </Link>
            <Link
              to="/products"
              className="text-base text-black hover:text-opacity-80 transition-all duration-200"
            >
              {t('products')}
            </Link>
            <Link
              to="/blogs"
              className="text-base text-black hover:text-opacity-80 transition-all duration-200"
            >
              {t('blogs')}
            </Link>
            <Link
              to="/weather"
              className="text-base text-black hover:text-opacity-80 transition-all duration-200"
            >
              {t('weather')}
            </Link>
          </div>

          {/* Cart and Language Shift */}
          <div className="flex items-center space-x-6">
            <CartButton />
            <LanguageShift />  {/* Language switcher */}
          </div>

          {/* Avatar / Login */}
          <div className="hidden lg:flex lg:items-center">
            {token ? (
              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button title="title" className="w-12 h-12 mt-1">
                  <Avatar src={profile_img} alt="User Avatar" />
                </button>
                {userNavPanel && <UserNavigationPanel />}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 text-base font-semibold text-white bg-black rounded-full transition-all duration-200 hover:bg-yellow-300 hover:text-black"
              >
                {t('login')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              to="/"
              className="block text-base font-medium text-black hover:text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
            >
              {t('home')}
            </Link>
            <Link
              to="/products"
              className="block text-base font-medium text-black hover:text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
            >
              {t('products')}
            </Link>
            <Link
              to="/blogs"
              className="block text-base font-medium text-black hover:text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
            >
              {t('blogs')}
            </Link>
            <Link
              to="/weather"
              className="block text-base font-medium text-black hover:text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
            >
              {t('weather')}
            </Link>
          </div>

          {/* Mobile Avatar / Login */}
          <div className="px-5 py-3">
            {token ? (
              <div className="flex justify-center">
                <button title="title" className="w-12 h-12 mt-1" onClick={handleUserNavPanel}>
                  <Avatar src={profile_img} alt="User Avatar" />
                </button>
                {userNavPanel && <UserNavigationPanel />}
              </div>
            ) : (
              <Link
                to="/login"
                className="block w-full text-center text-white bg-black px-4 py-2 rounded-full transition-all duration-200 hover:bg-yellow-300 hover:text-black"
              >
                {t('login')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
