import { RiderDetails } from '../model/Riders.interface.ts';

export const RIDERS_TABLE_HEADERS = [
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
