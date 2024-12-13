import { Outlet, RouteObject } from 'react-router-dom';
import { AppRoutes } from '@/routes/enum/Routes.enum.ts';
import RiderManagement from '@/modules/rider-management/pages/RiderManagement';
import RiderInfo from '@/modules/rider-management/pages/RiderDetails.tsx';

export const riderManagementRoutes: RouteObject[] = [
  {
    path: AppRoutes.RIDER_MANAGEMENT,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <RiderManagement />,
      },
      {
        path: ':riderId',
        element: <RiderInfo />,
      },
    ],
  },
];
