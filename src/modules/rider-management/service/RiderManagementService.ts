import axios from 'axios';
import {
  GetRiderResponse,
  GetRidersResponse,
  RiderFilterRequest,
} from '@/modules/rider-management/model/Riders.interface.ts';
import { v4 as uuid } from 'uuid';
import {
  AddRiderData,
  AddRiderDataResponse,
} from '@/modules/rider-management/model/AddRider.interface.ts';

const RIDER_MANAGEMENT_BASE_URL =
  import.meta.env.VITE_AGENT_API_URL + '/agent-api/v1/rest/riders';

const RiderManagementService = {
  // Get all riders
  async fetchRiders(
    page = 0,
    size = 20,
    filter: RiderFilterRequest = {}
  ): Promise<GetRidersResponse> {
    const response = await axios.post(
      `${RIDER_MANAGEMENT_BASE_URL}/all?page=${page}&size=${size}`,
      { data: filter },
      {
        headers: {
          accept: 'application/vnd.flex-ev.riders+json;version=1',
          'Content-Type': 'application/vnd.flex-ev.rider-filter+json;version=1',
        },
      }
    );
    return response.data;
  },

  // Add rider
  async addRider(addRiderData: AddRiderData): Promise<AddRiderDataResponse> {
    const formData = new FormData();

    if (addRiderData.photo) {
      formData.append('rider_image', addRiderData.photo);
    }
    if (addRiderData.aadhaar) {
      formData.append('aadhaar', addRiderData.aadhaar);
    }
    if (addRiderData.pan) {
      formData.append('pan', addRiderData.pan);
    }
    if (addRiderData.drivingLicense) {
      formData.append('driving_licence', addRiderData.drivingLicense);
    }
    if (addRiderData.passbook) {
      formData.append('passbook', addRiderData.passbook);
    }

    const riderData = {
      data: {
        rider: addRiderData.rider,
      },
    };

    formData.append(
      'request',
      new Blob([JSON.stringify(riderData)], { type: 'application/json' })
    );

    const idempotencyKey = uuid();

    const response = await axios.post(RIDER_MANAGEMENT_BASE_URL, formData, {
      headers: {
        accept: 'application/vnd.flex-ev.rider+json;version=1',
        'Idempotency-Key': idempotencyKey,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get rider by id
  async getRiderById(riderId: string): Promise<GetRiderResponse> {
    const response = await axios.get(
      `${RIDER_MANAGEMENT_BASE_URL}/${riderId}`,
      {
        headers: {
          accept: 'application/vnd.flex-ev.rider+json;version=1',
        },
      }
    );
    return response.data;
  },
};

export default RiderManagementService;
