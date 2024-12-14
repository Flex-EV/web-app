import { useRoutes } from 'react-router-dom';
import { riderManagementRoutes } from '@/modules/rider-management/routes';
import { vehicleManagementRoutes } from '@/modules/vehicle-management/routes';
import { dashboardRoutes } from '@/modules/dashboard/routes.tsx';
import { authRoutes } from '@/modules/auth/routes.tsx';
import { earningRoutes } from '@/modules/earning-details/routes.tsx';

export const Routes = () => {
  const combinedRoutes = [
    ...authRoutes,
    ...dashboardRoutes,
    ...riderManagementRoutes,
    ...vehicleManagementRoutes,
    ...earningRoutes,
  ];

  return useRoutes(combinedRoutes);
};
