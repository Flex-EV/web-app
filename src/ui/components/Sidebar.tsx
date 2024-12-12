import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '../data/Sidebar.data';
import flexLogo from '@/assets/flex_logo.jpeg';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close the sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`
      fixed 
      transition-all 
      duration-500
      ease-in-out
      bg-gradient-to-b from-green-500 to-green-700
      shadow-2xl
      z-50
      ${
        isSidebarOpen
          ? 'left-0 top-0 w-80 h-[100vh] rounded-r-2xl p-2 grid grid-rows-[auto_auto_1fr]'
          : 'left-4 top-1/2 -translate-y-1/2 w-20 h-[70vh] rounded-full p-2 flex flex-col items-center justify-center'
      }
      overflow-hidden
  `}
    >
      {/* Toggle Button */}
      <button
        className={`
          absolute 
          top-4 
          z-10 
          flex 
          items-center 
          justify-center 
          w-10 
          h-10 
          rounded-full 
          transition-all 
          duration-300 
          transform 
          hover:scale-110 
          active:scale-95 
          ${
            isSidebarOpen
              ? 'hover:text-red-500 text-white right-3 w-7 h-7'
              : 'bg-white hover:bg-gray-200 text-green-500'
          }
        `}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 transition-transform" />
        ) : (
          <Menu className="w-6 h-6 transition-transform" />
        )}
      </button>

      {/* Logo and Brand */}
      {isSidebarOpen && (
        <div className="flex items-center justify-center mb-6 mt-2">
          <img
            src={flexLogo}
            alt="Flex Logo"
            className="
              rounded-full
              w-16
              h-16
              object-cover
              border-2
              border-white
              transition-all
              duration-300
              hover:scale-110
              hover:rotate-6
              hover:shadow-xl
              active:scale-95
              shadow-md
            "
          />
        </div>
      )}

      {/* Navigation Menu */}
      <nav
        className={`
          ${
            isSidebarOpen ? 'block flex-1' : 'flex flex-col items-center w-full'
          }
        `}
      >
        <ul className={`space-y-2 ${isSidebarOpen ? '' : 'w-full'}`}>
          {MENU_ITEMS.map((item, index) => (
            <li key={index} className="w-full">
              <Link
                to={item.path}
                className={`
                  flex 
                  items-center 
                  px-4 
                  py-2.5 
                  rounded-full
                  transition-all 
                  duration-300 
                  group
                  relative
                  overflow-hidden
                  ${isSidebarOpen ? 'justify-start rounded-md' : 'justify-center'}
                  ${
                    location.pathname === item.path
                      ? 'bg-white text-green-500'
                      : 'hover:bg-green-400 text-white'
                  }
                  before:absolute 
                  before:inset-0 
                  before:bg-white 
                  before:opacity-0 
                  before:transition-opacity 
                  before:duration-300
                  hover:before:opacity-10
                  active:scale-95
                `}
              >
                <div
                  className={`
                    flex 
                    items-center 
                    ${isSidebarOpen ? 'mr-4' : ''}
                  `}
                >
                  <item.icon
                    className={`
                      h-6 
                      w-6 
                      transition-all 
                      duration-300
                      group-hover:rotate-6 
                      ${isSidebarOpen ? '' : 'group-hover:scale-110'}
                      ${
                        location.pathname === item.path
                          ? 'text-green-500 scale-110'
                          : 'text-white'
                      }
                    `}
                  />
                </div>
                {isSidebarOpen && (
                  <span
                    className={`
                      text-sm 
                      font-medium 
                      transition-all 
                      duration-300
                      group-hover:tracking-wider
                      ${
                        location.pathname === item.path
                          ? 'text-green-500'
                          : 'text-white'
                      }
                    `}
                  >
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {isSidebarOpen && (
        <div className="mt-auto pb-4 text-center">
          <p className="text-xs text-white opacity-80">© 2024 Flex EV</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
