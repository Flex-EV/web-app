import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '../data/Sidebar.data';
import { useState } from 'react';
import flexLogo from '@/assets/flex_logo.jpeg';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div
      className={`h-screen flex flex-col bg-gray-800 text-white border-r border-gray-700 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64 shadow-lg' : 'w-20'
      }`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 mb-4">
        {isSidebarOpen && (
          <div className="flex items-center transition-opacity duration-300 ease-in-out">
            <img
              src={flexLogo}
              alt="Flex Logo"
              className="rounded-md w-10 h-10"
            />
            <h1 className="ml-3 text-lg font-semibold tracking-wide">
              Flex-Fleet
            </h1>
          </div>
        )}
        {/* Toggle Button */}
        <button
          className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {MENU_ITEMS.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-500 border-l-4 border-blue-700'
                    : 'hover:bg-gray-600'
                } ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
              >
                <item.icon
                  className={`h-5 w-5 transition-transform duration-300 ${
                    location.pathname === item.path
                      ? 'text-white transform scale-110'
                      : 'text-gray-400'
                  } ${isSidebarOpen ? 'mr-3' : 'transform scale-125'}`}
                />
                {isSidebarOpen && (
                  <span
                    className={`text-sm font-medium transition-opacity duration-300 ${
                      location.pathname === item.path
                        ? 'text-white'
                        : 'text-gray-300'
                    } ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
