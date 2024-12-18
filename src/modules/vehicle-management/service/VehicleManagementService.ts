import axios from 'axios';
import {
  GetVehiclesResponse,
  VehicleFilter,
} from '@/modules/vehicle-management/model/Vehicles.interface.ts';
import { AddVehicleFormData } from '@/modules/vehicle-management/model/AddVehicle.interface.ts';
import { v4 as uuid } from 'uuid';

const VEHICLE_MANAGEMENT_BASE_URL = `${import.meta.env.VITE_AGENT_API_URL}/agent-api/v1/rest/vehicles`;

const VehicleManagementService = {
  // Fetch all vehicles
  async fetchVehicles(
    page = 0,
    size = 20,
    filter: VehicleFilter = {}
  ): Promise<GetVehiclesResponse> {
    const { vehicleNumber } = filter;

    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(vehicleNumber && { vehicleNumber }),
    });

    const response = await axios.get(
      `${VEHICLE_MANAGEMENT_BASE_URL}?${params.toString()}`,
      {
        headers: {
          accept: 'application/vnd.flex-ev.vehicles+json;version=1',
        },
      }
    );
    return response.data;
  },

  // Add vehicle
  async addVehicle(addVehicleFormData: AddVehicleFormData) {
    const addVehicleData = {
      data: {
        ...addVehicleFormData,
      },
    };

    const idempotencyKey = uuid();

    const response = await axios.post(
      VEHICLE_MANAGEMENT_BASE_URL,
      addVehicleData,
      {
        headers: {
          accept: 'application/vnd.flex-ev.vehicle+json;version=1',
          'Idempotency-Key': idempotencyKey,
          'Content-Type': 'application/vnd.flex-ev.vehicle+json;version=1',
        },
      }
    );
    return response.data;
  },
};

export default VehicleManagementService;
