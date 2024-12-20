import { Gender } from '../enum/Gender.enum';
import { VehicleAssignmentStatus } from '@/modules/rider-management/enum/AssignVehicle.enum.ts';

export interface Address {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface RiderDetails {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: Gender;
  currentAddress: Address;
  permanentAddress: Address;
}

export interface AssignedVehicleDetails {
  id: string;
  vehicleId: string;
  vehicleNumber: string;
  brand: string;
  name: string;
  model: string;
  batteryCapacityKwh: number;
  maxRangeKm: number;
  chassisNumber: string;
  rentalPricePerDay: number;
  assignmentDate: Date;
  returningDate: Date;
  assignmentStatus: VehicleAssignmentStatus;
}

export interface Rider {
  rider: RiderDetails;
  assignedVehicle: AssignedVehicleDetails;
}

export interface Riders {
  riders: Rider[];
}

export interface RiderFilterRequest {
  email?: string;
  phoneNumber?: string;
}

export interface GetRidersResponse {
  data: {
    riders: Riders;
  };
}

export interface GetRiderResponse {
  data: {
    rider: RiderDetails;
    assignedVehicle: AssignedVehicleDetails;
  };
}
