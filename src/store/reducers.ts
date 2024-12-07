import { combineReducers } from 'redux';
import riderManagementReducer from '../pages/rider-management/RiderManagementSlice.ts';

const rootReducer = combineReducers({
  riderManagement: riderManagementReducer,
});

export default rootReducer;
