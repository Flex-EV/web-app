import { BrowserRouter as Router } from 'react-router-dom';
import Header from '@/modules/ui/components/Header';
import Sidebar from '@/modules/ui/components/Sidebar';
import NotificationProvider from '@/modules/ui/components/NotificationProvider.tsx';
import { Routes } from '@/routes/Routes.tsx';

const App = () => {
  return (
    <Router>
      <NotificationProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto pl-24">
              <div className="p-4">
                <Routes />
              </div>
            </main>
          </div>
        </div>
      </NotificationProvider>
    </Router>
  );
};

export default App;
