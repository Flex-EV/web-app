import { VehicleStatus } from '../model/VehicleStatus.interface';

export const statuses: VehicleStatus[] = [
  {
    label: 'Active Vehicles',
    count: 12,
    color: 'bg-green-500',
  },
  {
    label: 'Idle Vehicles',
    count: 5,
    color: 'bg-blue-500',
  },
  {
    label: 'In Service Vehicles',
    count: 3,
    color: 'bg-yellow-500',
  },
];
