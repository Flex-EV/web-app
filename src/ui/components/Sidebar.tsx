import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from '../data/Sidebar.data';
import { SidebarProps } from '../model/Sidebar.interface';

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <div
      className={`${
        isOpen ? 'w-60' : 'w-20'
      } bg-black text-white h-screen flex flex-col transition-all duration-300`}
    >
      <div className="p-4 flex items-center mb-6 mt-6 overflow-hidden">
        {isOpen && (
          <img
            className="p-1"
            src="src/assets/flex-logo.jpeg"
            width={50}
            height={40}
          />
        )}
        {isOpen && <h1 className="p-1 text-xl font-bold">Flex-Fleet</h1>}
        <button
          className="p-1 mx-auto rounded-full hover:bg-gray-700 transition-colors duration-200"
          onClick={toggleSidebar}
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
                  isOpen ? '' : 'justify-center'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                {isOpen && item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;