export interface AssignVehicleRequest {
  vehicleId: string;
  assignmentDate: Date;
}

export interface AssignVehicleProps {
  riderId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
}
