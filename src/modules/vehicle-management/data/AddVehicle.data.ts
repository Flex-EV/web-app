import { AddVehicleFormData } from '@/modules/vehicle-management/model/AddVehicle.interface.ts';

export const INITIAL_ADD_VEHICLE_FORM_DATA: AddVehicleFormData = {
  vehicleNumber: '',
  brand: '',
  name: '',
  model: '',
  yearOfManufacture: new Date().getFullYear(),
  batteryCapacityKwh: 0,
  maxRangeKm: 0,
  chassisNumber: '',
  rentalPricePerDay: 0,
  procurementDate: '',
  iotDevice: {
    imeiNumber: '',
  },
};
