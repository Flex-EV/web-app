import React, { useEffect, useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store.ts';
import { fetchRiders } from '@/pages/rider-management/RiderManagementSlice.ts';
import { RiderDetails } from '@/pages/rider-management/model/Riders.interface.ts';
import FlexLoader from '@/ui/components/FlexLoader.tsx';
import FlexTable from '@/ui/components/FlexTable.tsx';
import { FlexTableHeader } from '@/ui/model/FlexTable.interface.ts';
import AddRider from './AddRider';
import { motion } from 'framer-motion';
import FlexButton from '@/ui/components/FlexButton.tsx';
import FlexContainer from '@/ui/components/FlexContainer';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/routes/enum/Routes.enum';

const Riders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fetchedRiders, isFetchingRiders, ridersFetchingError } = useSelector(
    (state: RootState) => state.riderManagement
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredRiders, setFilteredRiders] = useState<RiderDetails[]>([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    if (Array.isArray(fetchedRiders)) {
      const extractedRiders = fetchedRiders.map((rider) => rider.rider);
      setFilteredRiders(extractedRiders);
    }
  }, [fetchedRiders]);

  if (isFetchingRiders) {
    return <FlexLoader />;
  }

  if (ridersFetchingError) {
    return (
      <div className="p-6 bg-red-50 text-red-800 rounded-lg">
        Error fetching riders: {ridersFetchingError}
      </div>
    );
  }

  const renderRiderCell = (item: RiderDetails, field: keyof RiderDetails) => {
    const value = item[field];

    if (field === 'firstName') {
      return (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-semibold">
            {item.firstName.charAt(0)}
          </div>
          <div className="ml-4">
            <span className="text-sm font-medium text-gray-800">
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
    navigate(`${AppRoutes.RIDER_MANAGEMENT}/${rider.id}`);
  };

  return (
    <FlexContainer fullHeight padding="large" className={'m-5'}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-6"
      >
        <AddRider
          isOpen={isModalOpen}
          onClose={closeModal}
          onSuccess={handleAddRiderSuccess}
        />

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            Rider Management
          </h2>
          <div className="flex justify-end items-center gap-4">
            <div className="relative flex-grow max-w-lg">
              <input
                type="text"
                placeholder="Search riders..."
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
              text="Add Rider"
              type="button"
              variant="primary"
              icon={<UserPlus size={18} />}
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
            headers={RIDERS_TABLE_HEADERS}
            data={filteredRiders}
            renderCell={renderRiderCell}
            onRowClick={handleRiderRowClick}
          />
        </motion.div>
      </motion.div>
    </FlexContainer>
  );
};

export default Riders;
