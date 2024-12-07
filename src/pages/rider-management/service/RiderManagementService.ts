import axios from 'axios';
import {
  RiderFilterRequest,
  Riders,
} from '@/pages/rider-management/model/Riders.interface.ts';
import { v4 as uuid } from 'uuid';
import {
  AddRiderData,
  AddRiderDataResponse,
} from '@/pages/rider-management/model/AddRider.interface.ts'; // Importing UUID library

class RiderManagementService {
  private static RIDER_MANAGEMENT_BASE_URL =
    'http://3.109.1.118:8080/agent-api/v1/rest/riders';

  public static async fetchRiders(
    page: number = 0,
    size: number = 20,
    filter: RiderFilterRequest = {}
  ): Promise<Riders> {
    const response = await axios.post(
      `${this.RIDER_MANAGEMENT_BASE_URL}/all?page=${page}&size=${size}`,
      { data: filter },
      {
        headers: {
          accept: 'application/vnd.flex-ev.riders+json;version=1',
          'Content-Type': 'application/vnd.flex-ev.rider-filter+json;version=1',
        },
      }
    );
    return response.data;
  }

  public static addRider = async (
    addRiderData: AddRiderData
  ): Promise<AddRiderDataResponse> => {
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

    const response = await axios.post(
      this.RIDER_MANAGEMENT_BASE_URL,
      formData,
      {
        headers: {
          accept: 'application/vnd.flex-ev.rider+json;version=1',
          'Idempotency-Key': idempotencyKey,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  };
}

export default RiderManagementService;
