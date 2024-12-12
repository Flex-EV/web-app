import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRiderById } from '../rider-management/RiderManagementSlice';
import FlexLoader from '@/ui/components/FlexLoader';
import { PencilIcon } from 'lucide-react';

const RiderInfo = () => {
  const { riderId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { fetchedRiderById, isFetchingRiderById, riderByIdFetchingError } =
    useSelector((state: RootState) => state.riderManagement);

  useEffect(() => {
    if (riderId) {
      dispatch(fetchRiderById(riderId));
    }
  }, [dispatch, riderId]);

  if (isFetchingRiderById) {
    return <FlexLoader />;
  }
  if (riderByIdFetchingError) {
    return <div>Error Fetching Rider: {riderByIdFetchingError}</div>;
  }
  if (!fetchedRiderById) {
    return <div>No Rider Found</div>;
  }

  return (
    <>
      <div className="text-gray-100 text-2xl font-semibold mt-8 px-16">
        Rider Details
      </div>

      <div className="mt-6 mx-16 p-8 bg-gray-800/40 rounded-xl border border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <img
              src="/src/assets/profile.png"
              alt="Profile"
              width={90}
              height={90}
              className="rounded-full border-2 border-gray-700"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-100">
                {fetchedRiderById.firstName} {fetchedRiderById.middleName}{' '}
                {fetchedRiderById.lastName}
              </h2>
              <p className="text-gray-400 mt-2">Flex Rider</p>
              <p className="text-sm text-gray-500 mt-1">Uttar Pradesh</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mx-16 p-8 rounded-xl bg-gray-800/40 border border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-gray-100">
            Personal Information
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-200 text-sm rounded-lg hover:bg-gray-700 transition-colors">
            <PencilIcon size={16} />
            <span>Edit</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="block text-sm font-medium text-gray-400 mb-2">
              First Name
            </h3>
            <p className="text-gray-100">{fetchedRiderById.firstName}</p>
          </div>
          <div>
            <h3 className="block text-sm font-medium text-gray-400 mb-2">
              Middle Name
            </h3>
            <p className="text-gray-100">{fetchedRiderById.middleName}</p>
          </div>
          <div>
            <h3 className="block text-sm font-medium text-gray-400 mb-2">
              Last Name
            </h3>
            <p className="text-gray-100">{fetchedRiderById.lastName}</p>
          </div>
          <div>
            <h3 className="block text-sm font-medium text-gray-400 mb-2">
              Phone Number
            </h3>
            <p className="text-gray-100">{fetchedRiderById.phoneNumber}</p>
          </div>
          <div>
            <h3 className="block text-sm font-medium text-gray-400 mb-2">
              Date of Birth
            </h3>
            <p className="text-gray-100">
              {new Date(fetchedRiderById.dateOfBirth).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="block text-sm font-medium text-gray-400 mb-2">
              Gender
            </h3>
            <p className="text-gray-100">{fetchedRiderById.gender}</p>
          </div>
          <div>
            <h3 className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </h3>
            <p className="text-gray-100">{fetchedRiderById.email}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className=" mt-8 ml-16 p-8 rounded-xl bg-gray-800/40 border border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-gray-100">
              Current Address
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-200 text-sm rounded-lg hover:bg-gray-700 transition-colors">
              <PencilIcon size={16} />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                Line 1
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.currentAddress?.line1}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                Line 2
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.currentAddress?.line2}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                Line 3
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.currentAddress?.line3}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                City
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.currentAddress?.city}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                State
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.currentAddress?.state}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                Postal Code
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.currentAddress?.postalCode}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                Country
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.currentAddress?.country}
              </p>
            </div>
          </div>
        </div>
        <div className=" mt-8 mr-16 p-8 rounded-xl bg-gray-800/40 border border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-gray-100">
              Permanent Address
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-200 text-sm rounded-lg hover:bg-gray-700 transition-colors">
              <PencilIcon size={16} />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                Line 1
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.permanentAddress?.line1}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                Line 2
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.permanentAddress?.line2}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                Line 3
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.permanentAddress?.line3}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                City
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.permanentAddress?.city}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                State
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.permanentAddress?.state}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                Postal Code
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.permanentAddress?.postalCode}
              </p>
            </div>
            <div>
              <h3 className="block text-sm font-medium text-gray-400 mb-2">
                Country
              </h3>
              <p className="text-gray-100">
                {fetchedRiderById.permanentAddress?.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiderInfo;
