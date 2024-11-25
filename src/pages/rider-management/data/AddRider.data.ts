import { Gender } from '../enum/Gender.enum';

export const RIDER_DATA_INITIAL_STATE = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  currentAddress: {
    line1: '',
    line2: '',
    line3: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
  permanentAddress: {
    line1: '',
    line2: '',
    line3: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
  gender: Gender.Male,
  photo: null,
  aadhar: null,
  pan: null,
  dl: null,
};

export const MAX_STEP = 3;
export const MIN_STEP = 1;
