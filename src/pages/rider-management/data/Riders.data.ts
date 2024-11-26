import { Gender } from '../enum/Gender.enum';
import { RiderDetails } from '../model/RiderTable.interface';

export const TABLE_ITEMS = [
  {
    label: 'First Name',
    field: 'firstName',
    width: '10%',
  },
  {
    label: 'Middle Name',
    field: 'middleName',
    width: '10%',
  },
  {
    label: 'Last Name',
    field: 'lastName',
    width: '10%',
  },
  {
    label: 'Email',
    field: 'email',
    width: '20%',
  },
  {
    label: 'Phone',
    field: 'phone',
    width: '20%',
  },
  {
    label: 'Date of Birth',
    field: 'dob',
    width: '15%',
    render: (row: RiderDetails) =>
      new Date(row.dateOfBirth).toLocaleDateString(),
  },
  {
    label: 'Gender',
    field: 'gender',
    width: '25%',
  },
];

export const RIDER_DETAILS: RiderDetails[] = [
  {
    firstName: 'Aglae',
    middleName: 'Jordan',
    lastName: 'Boyer',
    email: 'Maurine2@hotmail.com',
    phoneNumber: '1-335-224-3752 x6540',
    dateOfBirth: '1994-07-17',
    gender: Gender.Other,
    id: '1',
  },
  {
    firstName: 'Myron',
    middleName: 'Alex',
    lastName: 'Balistreri',
    email: 'Camden53@yahoo.com',
    phoneNumber: '1-394-387-9429 x962',
    dateOfBirth: '1959-05-04',

    gender: Gender.Female,
    id: '2',
  },
  {
    firstName: 'Bobby',
    middleName: 'Taylor',
    lastName: 'Schoen',
    email: 'Karelle71@hotmail.com',
    phoneNumber: '1-671-981-6138',
    dateOfBirth: '1944-02-03',

    gender: Gender.Male,
    id: '3',
  },
  {
    firstName: 'Bria',
    middleName: 'August',
    lastName: 'Hoppe',
    email: 'Hertha22@hotmail.com',
    phoneNumber: '384.833.9073',
    dateOfBirth: '1987-07-22',

    gender: Gender.Male,
    id: '4',
  },
  {
    firstName: 'Amie',
    middleName: 'Leslie',
    lastName: 'Sporer',
    email: 'Tyreek_Tillman53@gmail.com',
    phoneNumber: '1-955-799-5953 x5401',
    dateOfBirth: '1999-05-23',

    gender: Gender.Female,
    id: '5',
  },
  {
    firstName: 'Elfrieda',
    middleName: 'Kyle',
    lastName: 'Legros',
    email: 'Augusta_Monahan29@gmail.com',
    phoneNumber: '973.970.2219 x099',
    dateOfBirth: '1975-01-02',

    gender: Gender.Male,
    id: '6',
  },
  {
    firstName: 'Hector',
    middleName: 'Jordan',
    lastName: 'Hilpert',
    email: 'Gerardo31@hotmail.com',
    phoneNumber: '1-692-889-7571',
    dateOfBirth: '1965-08-20',

    gender: Gender.Male,
    id: '7',
  },
  {
    firstName: 'Nya',
    middleName: 'Elliott',
    lastName: 'Cremin',
    email: 'Deshawn.Wehner68@yahoo.com',
    phoneNumber: '263-560-8852 x6982',
    dateOfBirth: '1976-05-07',

    gender: Gender.Male,
    id: '8',
  },
  {
    firstName: 'Royce',
    middleName: 'Kyle',
    lastName: 'Bosco',
    email: 'Margot74@yahoo.com',
    phoneNumber: '(913) 423-2667 x32510',
    dateOfBirth: '1972-01-08',

    gender: Gender.Other,
    id: '9',
  },
  {
    firstName: 'Kiley',
    middleName: 'Micah',
    lastName: 'Effertz',
    email: 'Helmer4@gmail.com',
    phoneNumber: '1-847-290-4011',
    dateOfBirth: '1952-02-06',

    gender: Gender.Male,
    id: '10',
  },
];
