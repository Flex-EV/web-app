import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store.ts';
import { useEffect } from 'react';
import { fetchVehicles } from '@/pages/vehicle-management/VehicleManagementSlice.ts';
import FlexLoader from '@/ui/components/FlexLoader.tsx';

const VehicleManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fetchedVehicles, isFetchingVehicles, vehiclesFetchingError } =
    useSelector((state: RootState) => state.vehicleManagement);

  useEffect(() => {
    dispatch(fetchVehicles({ page: 0, size: 20, filter: {} }));
  }, [dispatch]);

  //Temporary logic
  console.log(fetchedVehicles);
  if (isFetchingVehicles) {
    return <FlexLoader />;
  }

  if (vehiclesFetchingError) {
    return <div>Error fetching vehicles: {vehiclesFetchingError}</div>;
  }

  return <div className="text-neutral-100">Vehicle Management</div>;
};

export default VehicleManagement;
