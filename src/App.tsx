import { useState } from 'react';
import Sidebar from './ui/components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <main className="w-full h-screen flex flex-row relative">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 overflow-auto">
          <Routes />
        </div>
      </main>
    </Router>
  );
};

export default App;
