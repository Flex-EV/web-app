import { RouteObject } from 'react-router-dom';
import { AppRoutes } from '@/routes/enum/Routes.enum.ts';
import Login from '@/modules/auth/pages/Login.tsx';

export const authRoutes: RouteObject[] = [
  {
    path: AppRoutes.LOGIN,
    element: <Login />,
    children: [],
  },
];
