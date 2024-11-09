export interface RiderDetails {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  currentAddress: string;
  permanentAddress: string;
  gender: string;
}

export interface AddRiderModalProps {
  isOpen: boolean;
  onClose: () => void;
}
