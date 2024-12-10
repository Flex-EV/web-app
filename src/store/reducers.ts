import { combineReducers } from 'redux';
import riderManagementReducer from '../pages/rider-management/RiderManagementSlice.ts';
import vehicleManagementReducer from '@/pages/vehicle-management/VehicleManagementSlice.ts';

const rootReducer = combineReducers({
  riderManagement: riderManagementReducer,
  vehicleManagement: vehicleManagementReducer,
});

export default rootReducer;
