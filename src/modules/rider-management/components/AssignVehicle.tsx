import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Battery, Bike, Check, Filter, IndianRupee, Map } from 'lucide-react';
import { AppDispatch, RootState } from '@/store/store';
import { fetchVehicles } from '@/modules/vehicle-management/vehicleManagementSlice';
import { AvailabilityStatus } from '@/modules/vehicle-management/enum/Vehicles.enum';
import FlexButton from '@/modules/ui/components/FlexButton';
import FlexDialog from '@/modules/ui/components/FlexDialog';
import FlexSidePanel from '@/modules/ui/components/FlexSidePanel';
import FlexCircularLoader from '@/modules/ui/components/FlexCircularLoader';
import {
  AssignVehicleProps,
  AssignVehicleRequest,
} from '@/modules/rider-management/model/AssignVehicle.interface';
import {
  assignVehicleToRider,
  fetchRiderById,
} from '@/modules/rider-management/riderManagementSlice';
import { useNotification } from '@/modules/ui/hooks/useNotification';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const AssignVehicle = ({ isOpen, onClose, riderId }: AssignVehicleProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAssigningVehicle } = useSelector(
    (state: RootState) => state.riderManagement
  );

  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { showNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    isFetchingVehicles: loading,
    fetchedVehicles: vehicles,
    vehiclesFetchingError: error,
  } = useSelector((state: RootState) => state.vehicleManagement);

  // Memoize filtered vehicles to prevent unnecessary re-renders
  const filteredVehicles = useMemo(
    () =>
      vehicles.filter(
        (vehicle) =>
          vehicle.vehicleNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [vehicles, searchTerm]
  );

  useEffect(() => {
    if (isOpen) {
      dispatch(
        fetchVehicles({
          page: currentPage,
          size: pageSize,
          filter: {
            vehicleNumber: debouncedSearchTerm,
            availabilityStatus: AvailabilityStatus.AVAILABLE,
          },
        })
      );
    }
  }, [isOpen, currentPage, debouncedSearchTerm, dispatch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(0);
  };

  const handleClose = () => {
    setSelectedVehicleId('');
    setSearchTerm('');
    setCurrentPage(0);
    setIsConfirmModalOpen(false);
    onClose();
  };

  const handleAssign = async () => {
    if (!selectedVehicleId || !riderId) {
      return;
    }

    const assignVehicleRequest: AssignVehicleRequest = {
      vehicleId: selectedVehicleId,
      assignmentDate: new Date(),
    };

    try {
      await dispatch(
        assignVehicleToRider({ riderId, request: assignVehicleRequest })
      ).unwrap();

      showNotification({
        type: 'success',
        message: 'Vehicle assigned successfully.',
        position: 'center',
      });

      handleClose();
      dispatch(fetchRiderById(riderId));
    } catch (error) {
      showNotification({
        type: 'error',
        message: `Failed to assign vehicle. ${error}`,
      });
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <FlexSidePanel
      isOpen={isOpen}
      onClose={handleClose}
      title="Assign Vehicle"
      width="lg"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Available Vehicles ({filteredVehicles.length})
          </h2>
          <FlexButton
            text="Assign Selected"
            variant="primary"
            icon={<Check size={18} />}
            disabled={!selectedVehicleId}
            onClick={() => setIsConfirmModalOpen(true)}
          />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search by vehicle number..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search vehicles"
          />
          <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {error && (
          <div className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>
        )}

        <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
          {loading ? (
            <div className="h-full flex items-center justify-center py-12">
              <FlexCircularLoader />
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No vehicles found matching your search criteria
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedVehicleId === vehicle.id
                      ? 'border-green-500 bg-green-50'
                      : 'hover:border-green-300'
                  }`}
                  onClick={() => setSelectedVehicleId(vehicle.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && setSelectedVehicleId(vehicle.id)
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Bike className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {vehicle.brand}
                        </p>
                        <p className="text-xs text-gray-700">
                          {[vehicle.name, vehicle.model]
                            .filter(Boolean)
                            .join(' ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {vehicle.vehicleNumber}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-gray-50">
                        <IndianRupee size={14} className="text-gray-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">
                          Daily Rental
                        </span>
                        <span className="text-xs font-medium text-gray-700">
                          ₹{vehicle.rentalPricePerDay.toFixed(2)}/day
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-gray-50">
                        <Map size={14} className="text-gray-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Max Range</span>
                        <span className="text-xs font-medium text-gray-700">
                          {vehicle.maxRangeKm} km
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-gray-50">
                        <Battery size={14} className="text-gray-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Battery</span>
                        <span className="text-xs font-medium text-gray-700">
                          {vehicle.batteryCapacityKwh} kWh
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FlexDialog
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Vehicle Assignment"
      >
        <div className="space-y-5">
          <p className="text-gray-600">
            Are you sure you want to assign this vehicle to the rider?
          </p>
          <div className="flex justify-end gap-3">
            <FlexButton
              text="Cancel"
              variant="outline"
              size="sm"
              onClick={() => setIsConfirmModalOpen(false)}
            />
            <FlexButton
              text="Confirm"
              variant="primary"
              size="sm"
              onClick={handleAssign}
              loading={isAssigningVehicle}
            />
          </div>
        </div>
      </FlexDialog>
    </FlexSidePanel>
  );
};

export default AssignVehicle;
