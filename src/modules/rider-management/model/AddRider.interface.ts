import { Address } from '@/modules/rider-management/model/Riders.interface.ts';
import { Gender } from '@/modules/rider-management/enum/Gender.enum.ts';

export interface AddRiderProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface AddRiderData {
  rider: RiderData;
  photo: File | null;
  aadhaar: File | null;
  pan: File | null;
  drivingLicense: File | null;
  passbook: File | null;
}

export interface AddRiderDataResponse {
  data: {
    riderId: string;
  };
}

interface RiderData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: Gender;
  currentAddress: Address;
  permanentAddress: Address;
}
