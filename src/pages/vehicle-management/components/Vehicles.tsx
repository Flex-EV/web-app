import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store.ts';
import React, { useEffect, useState } from 'react';
import { fetchVehicles } from '@/pages/vehicle-management/VehicleManagementSlice.ts';
import FlexLoader from '@/ui/components/FlexLoader.tsx';
import { motion } from 'framer-motion';
import { FlexTableHeader } from '@/ui/model/FlexTable.interface.ts';
import { Vehicle } from '@/pages/vehicle-management/model/Vehicles.interface.ts';
import FlexTable from '@/ui/components/FlexTable.tsx';
import { Search } from 'lucide-react';
import { formatDateToDdMmYyyy } from '@/util/DateTimeUtils.ts';

const Vehicles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fetchedVehicles, isFetchingVehicles, vehiclesFetchingError } =
    useSelector((state: RootState) => state.vehicleManagement);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchVehicles({ page: 0, size: 20, filter: {} }));
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  //Temporary logic
  console.log(fetchedVehicles);
  if (isFetchingVehicles) {
    return <FlexLoader />;
  }

  if (vehiclesFetchingError) {
    return <div>Error fetching vehicles: {vehiclesFetchingError}</div>;
  }

  const handleVehicleRowClick = (vehicle: Vehicle) => {
    console.log('Row clicked', vehicle);
  };

  const renderVehicleCell = (item: Vehicle, field: keyof Vehicle) => {
    const value = item[field];

    if (value instanceof Date) {
      return formatDateToDdMmYyyy(value);
    }

    if (field === 'rentalPricePerDay') {
      if (typeof value === 'number') {
        return `₹${value.toFixed(2)}`;
      }
      return value;
    }

    return typeof value === 'string' ? value : '-';
  };

  const VEHICLE_TABLE_HEADERS: FlexTableHeader<Vehicle>[] = [
    { label: 'Vehicle Number', field: 'vehicleNumber' },
    { label: 'Brand', field: 'brand' },
    { label: 'Name', field: 'name' },
    { label: 'Model', field: 'model' },
    { label: 'Battery Capacity (kWh)', field: 'batteryCapacityKwh' },
    { label: 'Max Range (km)', field: 'maxRangeKm' },
    { label: 'Chassis Number', field: 'chassisNumber' },
    { label: 'Procurement Date', field: 'procurementDate' },
    { label: 'Rental Price (per day)', field: 'rentalPricePerDay' },
  ];

  return (
    <>
      <motion.div
        className="mx-6 lg:mx-10 mt-16 mb-8 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-100">All Vehicles</h2>
          <div className="relative flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search riders..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>
        <FlexTable
          headers={VEHICLE_TABLE_HEADERS}
          data={fetchedVehicles}
          renderCell={renderVehicleCell}
          onRowClick={handleVehicleRowClick}
        />
      </motion.div>
    </>
  );
};
export default Vehicles;
