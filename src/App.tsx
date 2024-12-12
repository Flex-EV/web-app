import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';
import Header from './ui/components/Header';
import Sidebar from './ui/components/Sidebar';
import NotificationProvider from '@/ui/components/NotificationProvider.tsx';

const App = () => {
  return (
    <NotificationProvider>
      <Router>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 ml-24 overflow-auto p-4">
              <Routes />
            </main>
          </div>
        </div>
      </Router>
    </NotificationProvider>
  );
};

export default App;
