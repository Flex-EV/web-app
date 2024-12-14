import { RouteObject } from 'react-router-dom';
import { AppRoutes } from '@/routes/enum/Routes.enum.ts';
import EarningDetails from '@/modules/earning-details/pages/EarningDetails.tsx';

export const earningRoutes: RouteObject[] = [
  {
    path: AppRoutes.EARNING_DETAILS,
    element: <EarningDetails />,
    children: [],
  },
];
