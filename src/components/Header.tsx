export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-neutral-200">
          Flex EV Dashboard
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <h1 className="text-neutral-100 text-md font-bold">Hey, Harsh</h1>
        <button>
          <img
            src="src\assets\Harsh-Image.jpg"
            alt="HS"
            className="w-10 h-10 rounded-full"
          />
        </button>
      </div>
    </header>
  );
};
