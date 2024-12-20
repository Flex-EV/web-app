import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import {
  Battery,
  Bike,
  Calendar,
  Clock,
  History,
  IndianRupee,
  Mail,
  Map,
  MapPin,
  PencilIcon,
  Phone,
  User,
} from 'lucide-react';
import { AppDispatch, RootState } from '@/store/store.ts';
import {
  fetchRiderById,
  returnAssignedVehicle,
} from '../riderManagementSlice.ts';
import FlexContainer from '@/modules/ui/components/FlexContainer';
import FlexLoader from '@/modules/ui/components/FlexLoader';
import FlexButton from '@/modules/ui/components/FlexButton';
import profilePhoto from '@/assets/profile.png';
import FlexCard from '@/modules/ui/components/FlexCard.tsx';
import { Address } from '@/modules/rider-management/model/Riders.interface.ts';
import { calculateAge } from '@/util/DateTimeUtils.ts';
import { getFullName } from '@/modules/rider-management/util/RiderUtils.ts';
import AssignVehicle from '@/modules/rider-management/components/AssignVehicle.tsx';
import { useNotification } from '@/modules/ui/hooks/useNotification.ts';
import ReturnVehicleDialog from '@/modules/rider-management/components/ReturnVehicleDialog.tsx';

const RiderDetails = () => {
  const { riderId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const {
    fetchedRiderById: rider,
    fetchedAssignedVehicle: assignedVehicle,
    isFetchingRiderById,
    riderByIdFetchingError,
    isReturningVehicle,
  } = useSelector((state: RootState) => state.riderManagement);

  const [isAssignPanelOpen, setIsAssignPanelOpen] = useState(false);
  const [isReturnConfirmModalOpen, setIsReturnConfirmModalOpen] =
    useState(false);

  const { showNotification } = useNotification();

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
        <p>{riderByIdFetchingError}</p>
      </div>
    );
  }

  if (!rider) {
    return <div className="text-gray-500">No rider found</div>;
  }

  const formatAddress = (address: Address) => {
    if (!address) return '';
    const parts = [address.line1];
    if (address.line2) parts.push(address.line2);
    parts.push(`${address.city}, ${address.state} ${address.postalCode}`);
    return parts.join(', ');
  };

  const handleReturnAssignedVehicle = () => {
    setIsReturnConfirmModalOpen(true);
  };

  const handleConfirmReturn = async () => {
    if (!assignedVehicle) {
      return;
    }

    try {
      await dispatch(
        returnAssignedVehicle({
          riderId: rider.id,
          vehicleId: assignedVehicle.vehicleId,
        })
      ).unwrap();

      showNotification({
        type: 'success',
        message: 'Vehicle returned successfully.',
        position: 'center',
      });

      dispatch(fetchRiderById(rider.id));
      setIsReturnConfirmModalOpen(false);
    } catch (error) {
      showNotification({
        type: 'error',
        message: `Error returning vehicle. ${error}`,
      });
    }
  };

  return (
    <FlexContainer title="Rider Details">
      <div className="space-y-6">
        {/* Profile Section */}
        <FlexCard
          title="Profile Information"
          actionButton={
            <FlexButton
              text="Edit Profile"
              variant="outline"
              size="sm"
              icon={<PencilIcon size={14} />}
            />
          }
        >
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-center gap-6">
                <div className="relative flex-shrink-0">
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-100 ring-2 ring-gray-50"
                  />
                  <span className="absolute -top-1 -right-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    Active
                  </span>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {getFullName(
                      rider.firstName,
                      rider.middleName,
                      rider.lastName
                    )}
                  </h3>
                  <span className="text-sm  font-medium text-green-600">
                    Flex Rider
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {rider.currentAddress.city}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gray-50">
                  <Mail size={16} className="text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-medium text-gray-700">
                    {rider.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gray-50">
                  <Phone size={16} className="text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Phone</span>
                  <span className="text-sm font-medium text-gray-700">
                    {rider.phoneNumber}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gray-50">
                  <User size={16} className="text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Gender</span>
                  <span className="text-sm font-medium text-gray-700">
                    {rider.gender}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gray-50">
                  <Calendar size={16} className="text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Age</span>
                  <span className="text-sm font-medium text-gray-700">
                    {calculateAge(rider.dateOfBirth)} years
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-gray-50">
                  <MapPin size={16} className="text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Current Address</span>
                  <span className="text-sm font-medium text-gray-700">
                    {formatAddress(rider.currentAddress)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-gray-50">
                  <MapPin size={16} className="text-gray-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">
                    Permanent Address
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {formatAddress(rider.permanentAddress)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FlexCard>

        {/* Vehicle Section */}
        <FlexCard
          title="Vehicle Information"
          actionButton={
            <div className="flex gap-2">
              <FlexButton
                text="History"
                variant="outline"
                size="sm"
                icon={<History size={14} />}
              />

              {assignedVehicle ? (
                <>
                  <FlexButton
                    text="Return Vehicle"
                    variant="primary"
                    size="sm"
                    icon={<Bike size={14} />}
                    onClick={handleReturnAssignedVehicle}
                  />
                  <ReturnVehicleDialog
                    isOpen={isReturnConfirmModalOpen}
                    onClose={() => setIsReturnConfirmModalOpen(false)}
                    onConfirm={handleConfirmReturn}
                    isReturningVehicle={isReturningVehicle}
                  />
                </>
              ) : (
                <FlexButton
                  text="Assign Vehicle"
                  variant="primary"
                  size="sm"
                  icon={<Bike size={14} />}
                  onClick={() => setIsAssignPanelOpen(true)}
                />
              )}

              <AssignVehicle
                isOpen={isAssignPanelOpen}
                onClose={() => setIsAssignPanelOpen(false)}
                riderId={riderId}
              />
            </div>
          }
        >
          {assignedVehicle ? (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 rounded-lg bg-green-100 flex items-center justify-center">
                  <Bike className="text-green-600" size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {assignedVehicle.brand}
                      </h3>
                      <p className="text-gray-600">
                        {[assignedVehicle.name, assignedVehicle.model]
                          .filter(Boolean)
                          .join(' ')}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Vehicle No: {assignedVehicle.vehicleNumber}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Currently Assigned
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-50">
                    <Battery size={16} className="text-gray-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      Battery Capacity
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {assignedVehicle.batteryCapacityKwh} kWh
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-50">
                    <Map size={16} className="text-gray-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Max Range</span>
                    <span className="text-sm font-medium text-gray-700">
                      {assignedVehicle.maxRangeKm} km
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-50">
                    <Bike size={16} className="text-gray-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      Chassis Number
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {assignedVehicle.chassisNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-50">
                    <IndianRupee size={16} className="text-gray-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Daily Rental</span>
                    <span className="text-sm font-medium text-gray-700">
                      ₹{assignedVehicle.rentalPricePerDay}/day
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-50">
                    <Calendar size={16} className="text-gray-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      Assignment Date
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {new Date(
                        assignedVehicle.assignmentDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-50">
                    <Clock size={16} className="text-gray-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Return Date</span>
                    <span className="text-sm font-medium text-gray-700">
                      {new Date(
                        assignedVehicle.returningDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
              <Bike className="text-gray-400 mb-2" size={32} />
              <p className="text-gray-500 mb-4">
                No vehicle currently assigned
              </p>
              <FlexButton
                text="Assign Vehicle"
                variant="primary"
                size="sm"
                icon={<Bike size={14} />}
                onClick={() => setIsAssignPanelOpen(true)}
              />

              <AssignVehicle
                isOpen={isAssignPanelOpen}
                onClose={() => setIsAssignPanelOpen(false)}
                riderId={riderId}
              />
            </div>
          )}
        </FlexCard>
      </div>
      <Outlet />;
    </FlexContainer>
  );
};

export default RiderDetails;
