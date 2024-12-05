import axios from 'axios';

const RIDER_MANAGEMENT_BASE_URL =
  'http://localhost:8080/agent-api/v1/rest/riders';

export interface RiderFilterRequest {
  email?: string;
  phoneNumber?: string;
}

export const fetchRidersFromApi = async (
  page = 0,
  size = 20,
  filter: RiderFilterRequest = {}
) => {
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
};
