import { useRoutes } from 'react-router-dom';
import { AppRoutes } from './enum/Routes.enum';
import RiderManagement from '@/pages/rider-management/RiderManagement';
import VehicleManagement from '@/pages/vehicle-management/VehicleManagement';
import EarningDetails from '@/pages/earning-details/EarningDetails';
import Reports from '@/pages/report/Reports';
import ServiceRequest from '@/pages/service-request/ServiceRequest';
import Dashboard from '@/pages/dashboard/Dashboard';

const Routes = () => {
  const routes = useRoutes([
    {
      path: AppRoutes.DASHBOARD,
      element: <Dashboard />,
    },
    {
      path: AppRoutes.RIDER_MANAGEMENT,
      element: <RiderManagement />,
    },
    {
      path: AppRoutes.VEHICLE_MANAGEMENT,
      element: <VehicleManagement />,
    },
    {
      path: AppRoutes.EARNING_DETAILS,
      element: <EarningDetails />,
    },
    {
      path: AppRoutes.REPORTS,
      element: <Reports />,
    },
    {
      path: AppRoutes.SERVICE_REQUEST,
      element: <ServiceRequest />,
    },
  ]);

  return routes;
};

export default Routes;
