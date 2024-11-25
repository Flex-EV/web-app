import { ChangeEventHandler } from 'react';
import { Gender } from '../enum/Gender.enum';

export interface TextInput {
  label: string;
  type: string;
  value: string;
  name: string;
  disabled?: boolean;
  pattern?: string;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface FileInput {
  label: string;
  type: string;
  accept: string;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface AddRiderProps {
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
  gender: Gender;

  photo: File | null;
  aadhar: File | null;
  pan: File | null;
  dl: File | null;
}
