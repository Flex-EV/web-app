import { Gender } from '../enum/Gender.enum';

export interface AddRiderProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Address {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface RiderData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  currentAddress: Address;
  permanentAddress: Address;
  gender: Gender;

  photo: File | null;
  aadhar: File | null;
  pan: File | null;
  dl: File | null;
}
