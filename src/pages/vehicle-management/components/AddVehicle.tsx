import {
  AddVehicleFormData,
  AddVehicleProps,
} from '@/pages/vehicle-management/model/AddVehicle.interface.ts';
import FlexTextInput from '@/ui/components/FlexTextInput';
import React, { useState } from 'react';
import { INITIAL_ADD_VEHICLE_FORM_DATA } from '@/pages/vehicle-management/data/AddVehicle.data.ts';
import FlexButton from '@/ui/components/FlexButton.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store.ts';
import { addVehicle } from '@/pages/vehicle-management/VehicleManagementSlice.ts';
import FlexModal from '@/ui/components/FlexModal.tsx';
import { useNotification } from '@/ui/hooks/useNotification.ts';

const AddVehicle = ({ isOpen, onClose, onSuccess }: AddVehicleProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAddingVehicle } = useSelector(
    (state: RootState) => state.vehicleManagement
  );

  const { showNotification } = useNotification();

  const [vehicleFormData, setVehicleFormData] = useState<AddVehicleFormData>(
    INITIAL_ADD_VEHICLE_FORM_DATA
  );

  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleFormData((prev) => ({
      ...prev,
      [name]:
        name === 'yearOfManufacture' ||
        name === 'batteryCapacityKwh' ||
        name === 'maxRangeKm' ||
        name === 'rentalPricePerDay'
          ? Math.max(0, Number(value))
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addVehicle(vehicleFormData)).unwrap();

      setVehicleFormData(INITIAL_ADD_VEHICLE_FORM_DATA);
      onSuccess();
      showNotification({
        type: 'success',
        message: 'Vehicle added successfully',
        position: 'center',
      });
    } catch (error) {
      showNotification({
        type: 'error',
        message: `Failed to add vehicle. ${error}`,
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <FlexModal title={'Vehicle Details'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <FlexTextInput
          label="Vehicle Number"
          name="vehicleNumber"
          value={vehicleFormData.vehicleNumber}
          onChange={handleInputChange}
          required
        />
        <FlexTextInput
          label="Brand"
          name="brand"
          value={vehicleFormData.brand}
          onChange={handleInputChange}
          required
        />
        <FlexTextInput
          label="Name"
          name="name"
          value={vehicleFormData.name}
          onChange={handleInputChange}
          required
        />
        <FlexTextInput
          label="Model"
          name="model"
          value={vehicleFormData.model}
          onChange={handleInputChange}
          required
        />
        <FlexTextInput
          label="Year of Manufacture"
          name="yearOfManufacture"
          type="number"
          value={vehicleFormData.yearOfManufacture.toString()}
          onChange={handleInputChange}
          required
        />
        <FlexTextInput
          label="Battery Capacity (kWh)"
          name="batteryCapacityKwh"
          type="number"
          value={vehicleFormData.batteryCapacityKwh.toString()}
          onChange={handleInputChange}
          required
        />
        <FlexTextInput
          label="Max Range (km)"
          name="maxRangeKm"
          type="number"
          value={vehicleFormData.maxRangeKm.toString()}
          onChange={handleInputChange}
          required
        />
        <FlexTextInput
          label="Chassis Number"
          name="chassisNumber"
          value={vehicleFormData.chassisNumber}
          onChange={handleInputChange}
          required
        />
        <FlexTextInput
          label="Rental Price (per day)"
          name="rentalPricePerDay"
          type="number"
          value={vehicleFormData.rentalPricePerDay.toString()}
          onChange={handleInputChange}
          required
        />
        <FlexTextInput
          label="Procurement Date"
          name="procurementDate"
          type="date"
          value={vehicleFormData.procurementDate}
          max={today}
          onChange={handleInputChange}
          required
        />
        <div className="col-span-2 mt-6 flex justify-end gap-4">
          <FlexButton
            type="submit"
            variant="primary"
            text="Submit"
            loading={isAddingVehicle}
            fullWidth
          />
        </div>
      </form>
    </FlexModal>
  );
};
export default AddVehicle;
