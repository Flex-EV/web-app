import { Gender } from '../enum/Gender.enum';
import { AddRiderData } from '@/modules/rider-management/model/AddRider.interface.ts';
import { Address } from '@/modules/rider-management/model/Riders.interface.ts';

export const RIDER_DATA_INITIAL_ADDRESS: Address = {
  line1: '',
  line2: '',
  line3: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
};

export const RIDER_DATA_INITIAL_STATE: AddRiderData = {
  rider: {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    currentAddress: RIDER_DATA_INITIAL_ADDRESS,
    permanentAddress: RIDER_DATA_INITIAL_ADDRESS,
    gender: Gender.Male,
  },

  photo: null,
  aadhaar: null,
  pan: null,
  drivingLicense: null,
};

export const MAX_STEP = 4;
export const MIN_STEP = 1;
