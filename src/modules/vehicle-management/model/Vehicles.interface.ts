import { AvailabilityStatus } from '@/modules/vehicle-management/enum/Vehicles.enum.ts';

export interface Vehicle {
  id: string;
  vehicleNumber: string;
  brand: string;
  name: string;
  model: string;
  yearOfManufacture: number;
  batteryCapacityKwh: number;
  maxRangeKm: number;
  chassisNumber: string;
  rentalPricePerDay: number;
  procurementDate: Date;
}

export interface GetVehiclesResponse {
  data: {
    vehicles: Vehicle[];
  };
}

export interface VehicleFilter {
  vehicleNumber?: string;
  availabilityStatus?: AvailabilityStatus;
}
