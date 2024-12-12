import React, { useState } from 'react';
import FlexTextInput from '@/ui/components/FlexTextInput';
import FlexFileInput from '@/ui/components/FlexFileInput';
import FlexButton from '@/ui/components/FlexButton';
import {
  MAX_STEP,
  MIN_STEP,
  RIDER_DATA_INITIAL_ADDRESS,
  RIDER_DATA_INITIAL_STATE,
} from '../data/AddRider.data';
import { AddRiderData, AddRiderProps } from '../model/AddRider.interface';
import {
  PHONE_NUMBER_REGEX_PATTERN,
  POSTAL_CODE_REGEX_PATTERN,
} from '../validation/RegexPattern';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store.ts';
import { addRider } from '@/pages/rider-management/RiderManagementSlice.ts';
import FlexModal from '@/ui/components/FlexModal.tsx';
import FlexDropdown from '@/ui/components/FlexDropdown.tsx';

const AddRider = ({ isOpen, onClose, onSuccess }: AddRiderProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isCreatingRider } = useSelector(
    (state: RootState) => state.riderManagement
  );

  const [step, setStep] = useState(1);
  const [check, setCheck] = useState(false);
  const [riderData, setRiderData] = useState<AddRiderData>(
    RIDER_DATA_INITIAL_STATE
  );

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < MAX_STEP) {
      setStep((prevStep) => prevStep + MIN_STEP);
    }
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    if (step > MIN_STEP) {
      setStep((prevStep) => prevStep - MIN_STEP);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRiderData((prev) => ({
      ...prev,
      rider: { ...prev.rider, [name]: value },
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [addressType, field] = name.split('.');

    setRiderData((prev) => ({
      ...prev,
      rider: {
        ...prev.rider,
        [addressType]: {
          ...prev.rider[addressType as 'currentAddress' | 'permanentAddress'],
          [field]: value,
        },
      },
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'photo' | 'aadhaar' | 'pan' | 'drivingLicense'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setRiderData((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleCheckChange = () => {
    const newCheckState = !check;
    setCheck(newCheckState);
    setRiderData((prev) => ({
      ...prev,
      rider: {
        ...prev.rider,
        permanentAddress: newCheckState
          ? { ...prev.rider.currentAddress }
          : RIDER_DATA_INITIAL_ADDRESS,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addRider(riderData));
      toast.success('Rider added');

      setRiderData(RIDER_DATA_INITIAL_STATE);
      setCheck(false);
      setStep(1);

      onSuccess();
    } catch (error) {
      toast.error('Failed to Add Rider. Please try again.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const titles = [
    'Rider Details',
    'Address Details',
    'Address Details',
    'Upload Documents',
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <FlexModal title={titles[step - 1]} onClose={onClose}>
      <form
        onSubmit={step === MAX_STEP ? handleSubmit : handleNext}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {step === 1 && (
          <>
            <FlexTextInput
              label="First Name"
              name="firstName"
              type="text"
              value={riderData.rider.firstName}
              onChange={handleInputChange}
              required
            />
            <FlexTextInput
              label="Middle Name"
              name="middleName"
              type="text"
              value={riderData.rider.middleName}
              onChange={handleInputChange}
            />
            <FlexTextInput
              label="Last Name"
              name="lastName"
              type="text"
              onChange={handleInputChange}
              value={riderData.rider.lastName}
            />
            <FlexTextInput
              label="Email"
              name="email"
              type="email"
              onChange={handleInputChange}
              required
              value={riderData.rider.email}
            />
            <FlexTextInput
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              pattern={PHONE_NUMBER_REGEX_PATTERN}
              onChange={handleInputChange}
              required
              value={riderData.rider.phoneNumber}
            />
            <FlexTextInput
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              onChange={handleInputChange}
              max={today}
              required
              value={riderData.rider.dateOfBirth}
            />
            <FlexDropdown
              label="Gender"
              options={genderOptions}
              value={riderData.rider.gender}
              onChange={handleInputChange}
            />
            <div className="col-span-2 mt-6 flex justify-end gap-4">
              <FlexButton
                type="submit"
                variant="primary"
                text="Next"
                fullWidth
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="col-span-2 text-lg font-medium text-black mb-2">
              Current Address
            </h3>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <FlexTextInput
                label="Address Line 1"
                type="text"
                value={riderData.rider.currentAddress.line1}
                name="currentAddress.line1"
                onChange={handleAddressChange}
                required
              />
              <FlexTextInput
                label="Address Line 2"
                type="text"
                value={riderData.rider.currentAddress.line2}
                name="currentAddress.line2"
                onChange={handleAddressChange}
              />
              <FlexTextInput
                label="Address Line 3"
                type="text"
                value={riderData.rider.currentAddress.line3}
                name="currentAddress.line3"
                onChange={handleAddressChange}
              />
              <FlexTextInput
                label="City"
                type="text"
                value={riderData.rider.currentAddress.city}
                name="currentAddress.city"
                onChange={handleAddressChange}
                required
              />
              <FlexTextInput
                label="State"
                type="text"
                value={riderData.rider.currentAddress.state}
                name="currentAddress.state"
                onChange={handleAddressChange}
                required
              />
              <FlexTextInput
                label="Country"
                type="text"
                value={riderData.rider.currentAddress.country}
                name="currentAddress.country"
                onChange={handleAddressChange}
                required
              />
              <FlexTextInput
                label="Pin Code"
                type="text"
                value={riderData.rider.currentAddress.postalCode}
                name="currentAddress.postalCode"
                onChange={handleAddressChange}
                pattern={POSTAL_CODE_REGEX_PATTERN}
                required
              />
            </div>

            <div className="col-span-2 mt-6 flex justify-between space-x-4">
              <FlexButton
                type="button"
                variant="neutral"
                text="Back"
                onClick={handleBack}
                fullWidth
              />
              <FlexButton
                type="submit"
                variant="primary"
                text="Next"
                fullWidth
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="col-span-2 flex items-center gap-4 mb-2">
              <h3 className="text-lg font-medium text-black">
                Permanent Address
              </h3>
              <div className="flex items-center gap-2 ml-auto">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  checked={check}
                  onChange={handleCheckChange}
                  id="checkbox"
                />
                <label
                  htmlFor="checkbox"
                  className="text-m font-medium text-black"
                >
                  Same as Current Address
                </label>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <FlexTextInput
                label="Address Line 1"
                type="text"
                value={
                  check
                    ? riderData.rider.currentAddress.line1
                    : riderData.rider.permanentAddress.line1
                }
                name="permanentAddress.line1"
                onChange={handleAddressChange}
                required
                disabled={check}
              />
              <FlexTextInput
                label="Address Line 2"
                type="text"
                value={
                  check
                    ? riderData.rider.currentAddress.line2
                    : riderData.rider.permanentAddress.line2
                }
                name="permanentAddress.line2"
                onChange={handleAddressChange}
                disabled={check}
              />
              <FlexTextInput
                label="Address Line 3"
                type="text"
                value={
                  check
                    ? riderData.rider.currentAddress.line3
                    : riderData.rider.permanentAddress.line3
                }
                name="permanentAddress.line2"
                onChange={handleAddressChange}
                disabled={check}
              />
              <FlexTextInput
                label="City"
                type="text"
                value={
                  check
                    ? riderData.rider.currentAddress.city
                    : riderData.rider.permanentAddress.city
                }
                name="permanentAddress.city"
                onChange={handleAddressChange}
                required
                disabled={check}
              />
              <FlexTextInput
                label="State"
                type="text"
                value={
                  check
                    ? riderData.rider.currentAddress.state
                    : riderData.rider.permanentAddress.state
                }
                name="permanentAddress.state"
                onChange={handleAddressChange}
                required
              />
              <FlexTextInput
                label="Country"
                type="text"
                value={
                  check
                    ? riderData.rider.currentAddress.country
                    : riderData.rider.permanentAddress.country
                }
                name="permanentAddress.country"
                onChange={handleAddressChange}
                required
                disabled={check}
              />
              <FlexTextInput
                label="Pin Code"
                type="text"
                value={
                  check
                    ? riderData.rider.currentAddress.postalCode
                    : riderData.rider.permanentAddress.postalCode
                }
                name="permanentAddress.postalCode"
                onChange={handleAddressChange}
                pattern={POSTAL_CODE_REGEX_PATTERN}
                required
                disabled={check}
              />
            </div>
            <div className="col-span-2 mt-6 flex justify-between space-x-4">
              <FlexButton
                type="button"
                variant="neutral"
                text="Back"
                onClick={handleBack}
                fullWidth
              />
              <FlexButton
                type="submit"
                variant="primary"
                text="Next"
                fullWidth
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <FlexFileInput
              label="Upload Rider Photo"
              type="file"
              accept=".pdf, .png, .jpg"
              onChange={(e) => handleFileChange(e, 'photo')}
              required
            />
            <FlexFileInput
              label="Upload Aadhar Card"
              type="file"
              accept=".pdf, .png, .jpg"
              onChange={(e) => handleFileChange(e, 'aadhaar')}
              required
            />
            <FlexFileInput
              label="Upload PAN Card"
              type="file"
              accept=".pdf, .png, .jpg"
              onChange={(e) => handleFileChange(e, 'pan')}
              required
            />
            <FlexFileInput
              label="Upload Driving License"
              type="file"
              accept=".pdf, .png, .jpg"
              onChange={(e) => handleFileChange(e, 'drivingLicense')}
              required
            />
            <div className="col-span-2 mt-6 flex justify-between space-x-4">
              <FlexButton
                type="button"
                variant="neutral"
                text="Back"
                onClick={handleBack}
                fullWidth
              />
              <FlexButton
                type="submit"
                variant="primary"
                text="Submit"
                loading={isCreatingRider}
                fullWidth
              />
            </div>
          </>
        )}
      </form>
    </FlexModal>
  );
};

export default AddRider;
