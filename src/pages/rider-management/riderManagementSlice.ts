import { Riders } from '@/pages/rider-management/model/Riders.interface.ts';
import {
  fetchRidersFromApi,
  RiderFilterRequest,
} from '@/pages/rider-management/service/RiderManagementService.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchRiders = createAsyncThunk(
  'riders/fetchRiders',
  async (
    {
      page,
      size,
      filter,
    }: { page: number; size: number; filter: RiderFilterRequest },
    { rejectWithValue }
  ) => {
    try {
      return await fetchRidersFromApi(page, size, filter);
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

interface RiderManagementState {
  isFetchingRiders: boolean;
  fetchedRiders: Riders;
  ridersFetchingError: string | null;
}

const initialRiderManagementState: RiderManagementState = {
  isFetchingRiders: false,
  fetchedRiders: {
    riders: [],
  },
  ridersFetchingError: null,
};

const riderManagementSlice = createSlice({
  name: 'riderManagement',
  initialState: initialRiderManagementState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiders.pending, (state) => {
        state.isFetchingRiders = true;
        state.ridersFetchingError = null;
      })
      .addCase(fetchRiders.fulfilled, (state, action) => {
        state.isFetchingRiders = false;
        state.fetchedRiders = action.payload.data.riders;
      })
      .addCase(fetchRiders.rejected, (state, action) => {
        state.isFetchingRiders = false;
        state.ridersFetchingError = action.payload as string;
      });
  },
});

export default riderManagementSlice.reducer;
