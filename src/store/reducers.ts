import { combineReducers } from 'redux';
import riderManagementReducer from '@/modules/rider-management/riderManagementSlice.ts';
import vehicleManagementReducer from '@/modules/vehicle-management/vehicleManagementSlice.ts';
import authReducers from '@/modules/auth/authSlice.ts';

const rootReducer = combineReducers({
  riderManagement: riderManagementReducer,
  vehicleManagement: vehicleManagementReducer,
  authentication: authReducers,
});

export default rootReducer;
