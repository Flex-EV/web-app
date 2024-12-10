import { User } from 'lucide-react';

const Header = () => {
  return (
    <header
      className="
        flex 
        items-center 
        justify-between 
        p-4 
        bg-gray-700 
        w-full 
        border-b 
        border-gray-600 
        shadow-md
      "
    >
      <div className="flex-1" />
      <div className="flex-1 flex justify-center items-center space-x-3">
        <h1 className="text-2xl font-bold text-white">Flex EV</h1>
      </div>

      <div className="flex-1 flex items-center justify-end space-x-4">
        <div className="flex items-center space-x-2">
          <div
            className="
              w-8 
              h-8 
              bg-gray-600 
              rounded-full 
              flex 
              items-center 
              justify-center
            "
          >
            <User className="text-gray-300 w-5 h-5" />
          </div>
          <h1 className="text-gray-300 text-md font-semibold">Hey, Mukul</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
