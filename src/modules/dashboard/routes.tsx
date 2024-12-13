import { RouteObject } from 'react-router-dom';
import { AppRoutes } from '@/routes/enum/Routes.enum.ts';
import Dashboard from '@/modules/dashboard/pages/Dashboard.tsx';

export const dashboardRoutes: RouteObject[] = [
  {
    path: AppRoutes.DASHBOARD,
    element: <Dashboard />,
    children: [],
  },
];
