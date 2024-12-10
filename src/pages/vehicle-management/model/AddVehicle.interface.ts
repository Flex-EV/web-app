export interface AddVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface AddVehicleFormData {
  vehicleNumber: string;
  brand: string;
  name: string;
  model: string;
  yearOfManufacture: number;
  batteryCapacityKwh: number;
  maxRangeKm: number;
  chassisNumber: string;
  rentalPricePerDay: number;
  procurementDate: string;
}
