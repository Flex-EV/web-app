import {
  Vehicle,
  VehicleFilter,
} from '@/pages/vehicle-management/model/Vehicles.interface.ts';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import VehicleManagementService from '@/pages/vehicle-management/service/VehicleManagementService.ts';
import { AddVehicleFormData } from '@/pages/vehicle-management/model/AddVehicle.interface.ts';

// Thunk to fetch all vehicles
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (
    {
      page,
      size,
      filter,
    }: {
      page: number;
      size: number;
      filter: VehicleFilter;
    },
    { rejectWithValue }
  ) => {
    try {
      return await VehicleManagementService.fetchVehicles(page, size, filter);
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

// Thunk to add a vehicle
export const addVehicle = createAsyncThunk(
  'vehicles/addVehicle',
  async (vehicle: AddVehicleFormData, { rejectWithValue }) => {
    try {
      return await VehicleManagementService.addVehicle(vehicle);
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

interface VehicleManagementState {
  // Fetch all vehicles
  isFetchingVehicles: boolean;
  fetchedVehicles: Vehicle[];
  vehiclesFetchingError: string | null;

  // Add a vehicle
  isAddingVehicle: boolean;
  addVehicleError: string | null;
}

const initialVehicleManagementState: VehicleManagementState = {
  // Fetch all vehicles
  isFetchingVehicles: false,
  fetchedVehicles: [],
  vehiclesFetchingError: null,

  // Add a vehicle
  isAddingVehicle: false,
  addVehicleError: null,
};

const vehicleManagementSlice = createSlice({
  name: 'vehicleManagement',
  initialState: initialVehicleManagementState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all vehicles
      .addCase(fetchVehicles.pending, (state) => {
        state.isFetchingVehicles = true;
        state.vehiclesFetchingError = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.isFetchingVehicles = false;
        state.fetchedVehicles = action.payload.data.vehicles;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.isFetchingVehicles = false;
        state.vehiclesFetchingError = action.payload as string;
      })

      // Add a vehicle
      .addCase(addVehicle.pending, (state) => {
        state.isAddingVehicle = true;
        state.addVehicleError = null;
      })
      .addCase(addVehicle.fulfilled, (state) => {
        state.isAddingVehicle = false;
      })
      .addCase(addVehicle.rejected, (state, action) => {
        state.isAddingVehicle = false;
        state.addVehicleError = action.payload as string;
      });
  },
});

export default vehicleManagementSlice.reducer;
