import { Gender } from '../enum/Gender.enum';

export interface RiderDetails {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: Gender;
}
