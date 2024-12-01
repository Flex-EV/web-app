const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-zinc-900 w-full border border-black border-b-gray-500">
      <div className="w-1/3" />
      <div className="w-1/3 flex justify-center">
        <h1 className="text-xl font-bold text-neutral-200">Flex EV</h1>
      </div>

      <div className="w-1/3 flex items-center justify-end space-x-4">
        <h1 className="text-neutral-100 text-md font-bold">Hey, Mukul</h1>
      </div>
    </header>
  );
};

export default Header;
