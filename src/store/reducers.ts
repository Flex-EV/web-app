import { combineReducers } from 'redux';
import riderManagementReducer from '@/modules/rider-management/riderManagementSlice.ts';
import vehicleManagementReducer from '@/modules/vehicle-management/vehicleManagementSlice.ts';

const rootReducer = combineReducers({
  riderManagement: riderManagementReducer,
  vehicleManagement: vehicleManagementReducer,
});

export default rootReducer;
