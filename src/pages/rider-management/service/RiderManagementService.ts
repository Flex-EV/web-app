import axios from 'axios';

const RIDER_MANAGEMENT_BASE_URL =
  'http://localhost:8080/agent-api/v1/rest/riders';

export interface RiderFilterRequest {
  email?: string;
  phoneNumber?: string;
}

const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchRidersFromApi = async (
  page: number = 0,
  size: number = 10,
  filter: RiderFilterRequest = {}
) => {
  try {
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
    await delay(1000);
    return response.data;
  } catch (error) {
    throw error;
  }
};
