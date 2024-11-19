export interface RiderDetails {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  currentAddress: string;
  permanentAddress: string;
  gender: string;
}

export interface AddRiderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface RiderData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  currentAddress: {
    line1: string;
    line2: string;
    line3: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  permanentAddress: {
    line1: string;
    line2: string;
    line3: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  gender: string;

  photo: File | null;
  aadhar: File | null;
  pan: File | null;
  drivingLicense: File | null;
}
