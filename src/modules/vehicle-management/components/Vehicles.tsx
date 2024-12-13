import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store.ts';
import React, { useEffect, useState } from 'react';
import { fetchVehicles } from '@/modules/vehicle-management/vehicleManagementSlice.ts';
import FlexLoader from '@/modules/ui/components/FlexLoader.tsx';
import { FlexTableHeader } from '@/modules/ui/model/FlexTable.interface.ts';
import { Vehicle } from '@/modules/vehicle-management/model/Vehicles.interface.ts';
import FlexTable from '@/modules/ui/components/FlexTable.tsx';
import { Bike, Search } from 'lucide-react';
import AddVehicle from '@/modules/vehicle-management/components/AddVehicle.tsx';
import { motion } from 'framer-motion';
import FlexButton from '@/modules/ui/components/FlexButton.tsx';
import FlexContainer from '@/modules/ui/components/FlexContainer.tsx';
import { formatDateToDdMmYyyy } from '@/util/DateTimeUtils.ts';

const Vehicles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fetchedVehicles, isFetchingVehicles, vehiclesFetchingError } =
    useSelector((state: RootState) => state.vehicleManagement);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchVehicles({ page: 0, size: 20, filter: {} }));
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  if (isFetchingVehicles) {
    return <FlexLoader />;
  }

  if (vehiclesFetchingError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-red-50 text-red-800 rounded-lg"
      >
        Error fetching vehicles: {vehiclesFetchingError}
      </motion.div>
    );
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddVehicleSuccess = () => {
    dispatch(fetchVehicles({ page: 0, size: 20, filter: {} }));
    closeModal();
  };

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

    return value;
  };

  const VEHICLE_TABLE_HEADERS: FlexTableHeader<Vehicle>[] = [
    { label: 'Vehicle Number', field: 'vehicleNumber' },
    { label: 'Brand', field: 'brand' },
    { label: 'Name', field: 'name' },
    { label: 'Model', field: 'model' },
    { label: 'Battery Capacity (kWh)', field: 'batteryCapacityKwh' },
    { label: 'Max Range (km)', field: 'maxRangeKm' },
    { label: 'Rental Price (per day)', field: 'rentalPricePerDay' },
    { label: 'Procurement Date', field: 'procurementDate' },
  ];

  const filteredVehicles = fetchedVehicles.filter((vehicle) =>
    Object.values(vehicle).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );

  return (
    <FlexContainer title=" Vehicle Management" fullHeight padding="large">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-6"
      >
        <AddVehicle
          isOpen={isModalOpen}
          onClose={closeModal}
          onSuccess={handleAddVehicleSuccess}
        />

        <div className="mb-6">
          <div className="flex justify-end items-center gap-4">
            <div className="relative flex-grow max-w-lg">
              <input
                type="text"
                placeholder="Search vehicles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
            </div>
            <FlexButton
              text="Add Vehicle"
              type="button"
              variant="primary"
              icon={<Bike size={18} />}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <FlexTable
            headers={VEHICLE_TABLE_HEADERS}
            data={filteredVehicles}
            renderCell={renderVehicleCell}
            onRowClick={handleVehicleRowClick}
          />
        </motion.div>
      </motion.div>
    </FlexContainer>
  );
};

export default Vehicles;
