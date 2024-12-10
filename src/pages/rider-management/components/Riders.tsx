import { motion } from 'framer-motion';
import { Search, UserRoundPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AddRider from './AddRider';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store.ts';
import { fetchRiders } from '@/pages/rider-management/RiderManagementSlice.ts';
import { RiderDetails } from '@/pages/rider-management/model/Riders.interface.ts';
import FlexLoader from '@/ui/components/FlexLoader.tsx';
import FlexTable from '@/ui/components/FlexTable.tsx';
import { FlexTableHeader } from '@/ui/model/FlexTable.interface.ts';

const Riders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fetchedRiders, isFetchingRiders, ridersFetchingError } = useSelector(
    (state: RootState) => state.riderManagement
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredRiders, setFilteredRiders] = useState<RiderDetails[]>([]);

  useEffect(() => {
    dispatch(fetchRiders({ page: 0, size: 20, filter: {} }));
  }, [dispatch]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddRiderSuccess = () => {
    dispatch(fetchRiders({ page: 0, size: 20, filter: {} }));
    closeModal();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  // Temporary comment-out of filtering logic
  // useEffect(() => {
  //   if (fetchedRiders?.riders) {
  //     const filtered = fetchedRiders.riders.filter((rider: any) => {
  //       const { firstName, email } = rider.rider;
  //       return (
  //         firstName.toLowerCase().includes(searchTerm) ||
  //         email.toLowerCase().includes(searchTerm)
  //       );
  //     });
  //     setFilteredRiders(filtered);
  //   }
  // }, [searchTerm, fetchedRiders]);

  // Use riders data directly for now
  useEffect(() => {
    if (Array.isArray(fetchedRiders)) {
      const extractedRiders = fetchedRiders.map((rider) => rider.rider);
      setFilteredRiders(extractedRiders);
    }
  }, [fetchedRiders]);

  //Temporary logic
  if (isFetchingRiders) {
    return <FlexLoader />;
  }

  if (ridersFetchingError) {
    return <div>Error fetching riders: {ridersFetchingError}</div>;
  }

  const renderRiderCell = (item: RiderDetails, field: keyof RiderDetails) => {
    const value = item[field];

    if (field === 'firstName') {
      return (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 flex items-center justify-center text-white font-semibold">
            {item.firstName.charAt(0)}
          </div>
          <div className="ml-4">
            <span className="text-sm font-medium text-gray-100">
              {item.firstName}
            </span>
          </div>
        </div>
      );
    }

    if (value instanceof Date) {
      const day = String(value.getDate()).padStart(2, '0');
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const year = value.getFullYear();
      return `${day}-${month}-${year}`;
    }

    if (value === null || value === undefined || value === '') {
      return '-';
    }

    return typeof value === 'string' ? value : '-';
  };
  const RIDERS_TABLE_HEADERS: FlexTableHeader<RiderDetails>[] = [
    { label: 'First Name', field: 'firstName' },
    { label: 'Last Name', field: 'lastName' },
    { label: 'Email', field: 'email' },
    { label: 'Phone Number', field: 'phoneNumber' },
    { label: 'Date of Birth', field: 'dateOfBirth' },
    { label: 'Gender', field: 'gender' },
  ];

  const handleRiderRowClick = (rider: RiderDetails) => {
    console.log('Rider clicked:', rider);
  };

  return (
    <>
      <AddRider
        isOpen={isModalOpen}
        onClose={closeModal}
        onSuccess={handleAddRiderSuccess}
      />
      <div className="relative">
        <button
          onClick={() => setIsModalOpen(true)}
          className="my-4 mr-10 bg-blue-500 hover:bg-blue-400 text-white py-2 pl-8 pr-4 rounded-lg absolute top-0 right-0"
        >
          Add New Rider
          <UserRoundPlus
            className="absolute text-white left-2 top-2.5"
            size={18}
          />
        </button>
      </div>

      <motion.div
        className="mx-10 mt-20 mb-10 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">All Riders</h2>
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
          headers={RIDERS_TABLE_HEADERS}
          data={filteredRiders}
          renderCell={renderRiderCell}
          onRowClick={handleRiderRowClick}
        />
      </motion.div>
    </>
  );
};
export default Riders;
