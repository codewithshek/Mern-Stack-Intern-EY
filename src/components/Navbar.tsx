import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut, LogIn, Home, Clipboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-orange-600 font-bold text-xl">Food Delivery</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/my-orders" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  My Orders
                </Link>
                
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                    Admin
                  </Link>
                )}
                
                <div className="relative group">
                  <button className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <span className="mr-1">{user?.name}</span>
                    <User size={16} />
                  </button>
                  
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                  Sign Up
                </Link>
              </>
            )}
            
            <Link to="/cart" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md relative mr-2">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home size={16} className="mr-2" />
                Home
              </div>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/my-orders"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Clipboard size={16} className="mr-2" />
                    My Orders
                  </div>
                </Link>
                
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    Profile
                  </div>
                </Link>
                
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <LogIn size={16} className="mr-2" />
                    Login
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-orange-600 text-white hover:bg-orange-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;