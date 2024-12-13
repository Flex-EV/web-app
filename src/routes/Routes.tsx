import { useRoutes } from 'react-router-dom';
import { riderManagementRoutes } from '@/modules/rider-management/routes';
import { vehicleManagementRoutes } from '@/modules/vehicle-management/routes';
import { dashboardRoutes } from '@/modules/dashboard/routes.tsx';

export const Routes = () => {
  const combinedRoutes = [
    ...dashboardRoutes,
    ...riderManagementRoutes,
    ...vehicleManagementRoutes,
  ];

  return useRoutes(combinedRoutes);
};
