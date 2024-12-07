import {
  RiderFilterRequest,
  Riders,
} from '@/pages/rider-management/model/Riders.interface.ts';
import RiderManagementService from '@/pages/rider-management/service/RiderManagementService.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddRiderData } from '@/pages/rider-management/model/AddRider.interface.ts';

// Thunk to fetch all riders
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
      return await RiderManagementService.fetchRiders(page, size, filter);
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

// Thunk to add a rider
export const addRider = createAsyncThunk(
  'riders/addRider',
  async (addRiderData: AddRiderData, { rejectWithValue }) => {
    try {
      return await RiderManagementService.addRider(addRiderData);
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

interface RiderManagementState {
  // Fetch all riders
  isFetchingRiders: boolean;
  fetchedRiders: Riders;
  ridersFetchingError: string | null;

  // Add a rider
  isCreatingRider: boolean;
  createRiderError: string | null;
}

const initialRiderManagementState: RiderManagementState = {
  // Fetch all riders
  isFetchingRiders: false,
  fetchedRiders: {
    riders: [],
  },
  ridersFetchingError: null,

  // Add a rider
  isCreatingRider: false,
  createRiderError: null,
};

const riderManagementSlice = createSlice({
  name: 'riderManagement',
  initialState: initialRiderManagementState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all riders
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
      })

      // Add a rider
      .addCase(addRider.pending, (state) => {
        state.isCreatingRider = true;
        state.createRiderError = null;
      })
      .addCase(addRider.fulfilled, (state) => {
        state.isCreatingRider = false;
      })
      .addCase(addRider.rejected, (state, action) => {
        state.isCreatingRider = false;
        state.createRiderError = action.payload as string;
      });
  },
});

export default riderManagementSlice.reducer;
