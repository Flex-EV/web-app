import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from '../data/Sidebar.data';
import { useState } from 'react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div
      className={`${
        isSidebarOpen ? 'w-60' : 'w-20'
      } bg-gray-750 text-white h-screen flex flex-col transition-all duration-300  border border-gray-900 border-r-gray-500`}
    >
      <div className="p-4 flex items-center mb-6 mt-6 overflow-hidden">
        {isSidebarOpen && (
          <img
            className="p-1"
            src="src/assets/flex_logo.jpeg"
            width={50}
            height={40}
          />
        )}
        {isSidebarOpen && (
          <h1 className="p-1 text-xl font-semibold">Flex-Fleet</h1>
        )}
        <button
          className="p-1 mx-auto rounded-full hover:bg-gray-700 transition-colors duration-200"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <nav className="flex-1 mt-6">
        <ul className="space-y-3 overflow-hidden">
          {MENU_ITEMS.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors duration-200 flex items-center ${
                  isSidebarOpen ? '' : 'justify-center'
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : ''}`}
                />
                <span className="text-sm">{isSidebarOpen && item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
