import { Gender } from '../enum/Gender.enum';

const RIDER_DATA_INITIAL_ADDRESS = {
  line1: '',
  line2: '',
  line3: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
};

export const RIDER_DATA_INITIAL_STATE = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  currentAddress: RIDER_DATA_INITIAL_ADDRESS,
  permanentAddress: RIDER_DATA_INITIAL_ADDRESS,
  gender: Gender.Male,
  photo: null,
  aadhar: null,
  pan: null,
  dl: null,
};

export const MAX_STEP = 3;
export const MIN_STEP = 1;
