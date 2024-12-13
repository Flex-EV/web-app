import {
  RiderDetails,
  RiderFilterRequest,
  Riders,
} from '@/modules/rider-management/model/Riders.interface.ts';
import RiderManagementService from '@/modules/rider-management/service/RiderManagementService.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddRiderData } from '@/modules/rider-management/model/AddRider.interface.ts';
import { handleApiError } from '@/util/ErrorHandlerUtils.ts';

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
      const errorMessage = handleApiError(error);
      return rejectWithValue(errorMessage);
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
      const errorMessage = handleApiError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to fetch a rider by id
export const fetchRiderById = createAsyncThunk(
  'riders/fetchRiderById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await RiderManagementService.getRiderById(id);
    } catch (error) {
      const errorMessage = handleApiError(error);
      return rejectWithValue(errorMessage);
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

  // Fetch a rider by id
  isFetchingRiderById: boolean;
  fetchedRiderById: RiderDetails | null;
  riderByIdFetchingError: string | null;
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

  // Fetch a rider by id
  isFetchingRiderById: false,
  fetchedRiderById: null,
  riderByIdFetchingError: null,
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
      })

      // Fetch a rider by id
      .addCase(fetchRiderById.pending, (state) => {
        state.isFetchingRiderById = true;
        state.riderByIdFetchingError = null;
      })
      .addCase(fetchRiderById.fulfilled, (state, action) => {
        state.isFetchingRiderById = false;
        state.fetchedRiderById = action.payload.data.rider;
      })
      .addCase(fetchRiderById.rejected, (state, action) => {
        state.isFetchingRiderById = false;
        state.riderByIdFetchingError = action.payload as string;
      });
  },
});

export default riderManagementSlice.reducer;
