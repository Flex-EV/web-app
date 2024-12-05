import { combineReducers } from 'redux';
import riderManagementReducer from '../pages/rider-management/riderManagementSlice.ts';

const rootReducer = combineReducers({
  riderManagement: riderManagementReducer,
});

export default rootReducer;
