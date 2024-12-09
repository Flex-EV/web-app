import axios from 'axios';
import {
  GetVehiclesResponse,
  VehicleFilter,
} from '@/pages/vehicle-management/model/Vehicles.interface.ts';

const VEHICLE_MANAGEMENT_BASE_URL =
  'http://localhost:8080/agent-api/v1/rest/vehicles';

const VehicleManagementService = {
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
};

export default VehicleManagementService;
