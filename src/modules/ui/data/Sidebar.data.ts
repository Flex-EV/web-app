import {
  BikeIcon,
  FileText,
  IndianRupee,
  LayoutDashboard,
  Users,
  Wrench,
} from 'lucide-react';
import { MenuItem } from '../model/Sidebar.interface.ts';
import { AppRoutes } from '@/routes/enum/Routes.enum.ts';

export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: AppRoutes.DASHBOARD,
  },
  {
    name: 'Rider Management',
    icon: Users,
    path: AppRoutes.RIDER_MANAGEMENT,
  },
  {
    name: 'Vehicle Management',
    icon: BikeIcon,
    path: AppRoutes.VEHICLE_MANAGEMENT,
  },
  {
    name: 'Earning Details',
    icon: IndianRupee,
    path: AppRoutes.EARNING_DETAILS,
  },
  {
    name: 'Reports and Insights',
    icon: FileText,
    path: AppRoutes.REPORTS,
  },
  {
    name: 'Service Request',
    icon: Wrench,
    path: AppRoutes.SERVICE_REQUEST,
  },
];
