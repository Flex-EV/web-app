import { BrowserRouter as Router } from 'react-router-dom';
import Header from '@/modules/ui/components/Header';
import Sidebar from '@/modules/ui/components/Sidebar';
import NotificationProvider from '@/modules/ui/components/NotificationProvider.tsx';
import { Routes } from '@/routes/Routes.tsx';
import { useEffect } from 'react';
import AuthService from '@/modules/auth/service/AuthService.ts';
import { GlobalProtectedRoutes } from '@/modules/auth/components/GlobalProtectedRoutes.tsx';

const App = () => {
  useEffect(() => {
    console.log('App component mounted - Initializing AuthService');
    AuthService.initialize();
  }, []);

  return (
    <Router>
      <GlobalProtectedRoutes>
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
      </GlobalProtectedRoutes>
    </Router>
  );
};

export default App;
