import Sidebar from './ui/components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';
import Header from './ui/components/Header';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <main className="w-full h-screen flex flex-row">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <div className="z-10">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col z-10">
          <Header />
          <div className="flex-1 overflow-auto">
            <Routes />
          </div>
        </div>
      </main>
    </Router>
  );
};

export default App;
