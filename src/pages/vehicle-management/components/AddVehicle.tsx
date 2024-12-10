import { motion } from 'framer-motion';
import { X } from 'lucide-react';
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
import { toast } from 'sonner';

const AddVehicle = ({ isOpen, onClose, onSuccess }: AddVehicleProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAddingVehicle } = useSelector(
    (state: RootState) => state.vehicleManagement
  );

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
      await dispatch(addVehicle(vehicleFormData));
      toast.success('Vehicle added');
      setVehicleFormData(INITIAL_ADD_VEHICLE_FORM_DATA);
      onSuccess();
    } catch (error) {
      toast.error('Failed to add vehicle. Please try again.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 relative border border-gray-700"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
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
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};
export default AddVehicle;
