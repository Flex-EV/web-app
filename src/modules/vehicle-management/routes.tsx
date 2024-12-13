import { Outlet, RouteObject } from 'react-router-dom';
import { AppRoutes } from '@/routes/enum/Routes.enum.ts';
import VehicleManagement from '@/modules/vehicle-management/pages/VehicleManagement.tsx';

export const vehicleManagementRoutes: RouteObject[] = [
  {
    path: AppRoutes.VEHICLE_MANAGEMENT,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <VehicleManagement />,
      },
    ],
  },
];
