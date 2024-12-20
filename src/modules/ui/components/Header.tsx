import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import flexLogo from '@/assets/flex_logo.jpeg';
import AuthService from '@/modules/auth/service/AuthService.ts';

const Header = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between p-3 bg-white shadow-md w-full">
      <div className="flex-1">
        <img
          src={flexLogo}
          alt="Flex Logo"
          className="
              rounded-full
              w-12
              h-12
              object-cover
              ml-5
              border-2
              border-green-500
              transition-transform
              duration-300
              shadow-md
            "
        />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-black">
          Flex <span className="text-green-500">EV</span>
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-end space-x-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group">
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors group"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
              <User className="text-green-600 w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-gray-700">Hey, Mukul</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isProfileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm text-gray-800 font-medium">Mukul</p>
                  <p className="text-xs text-gray-500">admin@flex-ev.tech</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-gray-700">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-gray-700">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                </div>
                <div className="border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center space-x-2 text-red-600 hover:text-red-800"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
