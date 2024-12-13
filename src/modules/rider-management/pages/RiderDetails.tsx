import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PencilIcon } from 'lucide-react';

import { AppDispatch, RootState } from '@/store/store.ts';
import { fetchRiderById } from '../riderManagementSlice.ts';

import FlexContainer from '@/modules/ui/components/FlexContainer';
import FlexLoader from '@/modules/ui/components/FlexLoader.tsx';
import FlexButton from '@/modules/ui/components/FlexButton.tsx';
import profilePhoto from '@/assets/profile.png';

const RiderDetails = () => {
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
    return (
      <div className="p-6 bg-red-50 text-red-800 rounded-lg">
        Error Fetching Rider: {riderByIdFetchingError}
      </div>
    );
  }

  if (!fetchedRiderById) {
    return (
      <FlexContainer
        fullHeight
        padding="large"
        className="flex items-center justify-center"
      >
        <div className="text-gray-500">No Rider Found</div>
      </FlexContainer>
    );
  }

  const renderInfoSection = (
    title: string,
    fields: Array<{ label: string; value: string | undefined }>
  ) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <FlexButton
          text="Edit"
          type="button"
          variant="outline"
          size="xs"
          icon={<PencilIcon size={12} />}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {fields.map((field, index) => (
          <div key={index}>
            <p className="text-sm text-gray-500 mb-1">{field.label}</p>
            <p className="font-medium text-gray-800">{field.value || '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <FlexContainer title="Rider Details" fullHeight padding="large">
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-6">
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {fetchedRiderById.firstName} {fetchedRiderById.middleName}{' '}
                {fetchedRiderById.lastName}
              </h2>
              <p className="text-green-500">Flex Rider</p>
              <p className="text-sm text-gray-500">Uttar Pradesh</p>
            </div>
          </div>
        </div>

        {renderInfoSection('Personal Information', [
          { label: 'First Name', value: fetchedRiderById.firstName },
          { label: 'Middle Name', value: fetchedRiderById.middleName },
          { label: 'Last Name', value: fetchedRiderById.lastName },
          { label: 'Phone Number', value: fetchedRiderById.phoneNumber },
          {
            label: 'Date of Birth',
            value: new Date(fetchedRiderById.dateOfBirth).toLocaleDateString(),
          },
          { label: 'Gender', value: fetchedRiderById.gender },
          { label: 'Email Address', value: fetchedRiderById.email },
        ])}

        <div className="grid md:grid-cols-2 gap-6">
          {renderInfoSection('Current Address', [
            { label: 'Line 1', value: fetchedRiderById.currentAddress?.line1 },
            { label: 'Line 2', value: fetchedRiderById.currentAddress?.line2 },
            { label: 'City', value: fetchedRiderById.currentAddress?.city },
            { label: 'State', value: fetchedRiderById.currentAddress?.state },
            {
              label: 'Postal Code',
              value: fetchedRiderById.currentAddress?.postalCode,
            },
            {
              label: 'Country',
              value: fetchedRiderById.currentAddress?.country,
            },
          ])}

          {renderInfoSection('Permanent Address', [
            {
              label: 'Line 1',
              value: fetchedRiderById.permanentAddress?.line1,
            },
            {
              label: 'Line 2',
              value: fetchedRiderById.permanentAddress?.line2,
            },
            { label: 'City', value: fetchedRiderById.permanentAddress?.city },
            { label: 'State', value: fetchedRiderById.permanentAddress?.state },
            {
              label: 'Postal Code',
              value: fetchedRiderById.permanentAddress?.postalCode,
            },
            {
              label: 'Country',
              value: fetchedRiderById.permanentAddress?.country,
            },
          ])}
        </div>
      </div>
    </FlexContainer>
  );
};

export default RiderDetails;
