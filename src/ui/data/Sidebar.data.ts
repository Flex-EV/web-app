import {
  FileText,
  IndianRupee,
  LayoutDashboard,
  Truck,
  Users,
  Wrench,
} from 'lucide-react';
import { MenuItem } from '../model/Sidebar.interface';
import { AppRoutes } from '@/routes/enum/Routes.enum';

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
    icon: Truck,
    path: AppRoutes.VEHICLE_MANAGEMENT,
  },
  {
    name: 'Earning Details',
    icon: IndianRupee,
    path: AppRoutes.EARNING_DETAILS,
  },
  {
    name: 'Reports',
    icon: FileText,
    path: AppRoutes.REPORTS,
  },
  {
    name: 'Service Request',
    icon: Wrench,
    path: AppRoutes.SERVICE_REQUEST,
  },
];
