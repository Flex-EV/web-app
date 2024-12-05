import { Gender } from '../enum/Gender.enum';

interface Address {
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
  dateOfBirth: string;
  gender: Gender;
  currentAddress: Address;
  permanentAddress: Address;
}

export interface Rider {
  rider: RiderDetails;
}

export interface Riders {
  riders: Rider[];
}
