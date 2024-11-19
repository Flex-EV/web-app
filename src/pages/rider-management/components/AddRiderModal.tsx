import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AddRiderModalProps, RiderData } from '../model/RiderTable.interface';
import FlexTextInput from '@/ui/components/FlexTextInput';
import FlexFileInput from '@/ui/components/FlexFileInput';

const AddRiderModal = ({ isOpen, onClose }: AddRiderModalProps) => {
  const [step, setStep] = useState(1);
  const [riderData, setRiderData] = useState<RiderData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    currentAddress: {
      line1: '',
      line2: '',
      line3: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    permanentAddress: {
      line1: '',
      line2: '',
      line3: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    gender: '',
    photo: null,
    aadhar: null,
    pan: null,
    drivingLicense: null,
  });

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((i) => {
      if (i >= 3) return i;
      return i + 1;
    });
  };
  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((i) => {
      if (i <= 1) return i;
      return i - 1;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRiderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [addressType, field] = name.split('.');

    setRiderData((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType as 'currentAddress' | 'permanentAddress'],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    setRiderData({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      currentAddress: {
        line1: '',
        line2: '',
        line3: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      },
      permanentAddress: {
        line1: '',
        line2: '',
        line3: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      },
      gender: '',
      photo: null,
      aadhar: null,
      pan: null,
      drivingLicense: null,
    });
    setStep(1);
  };

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

        <h2 className="text-xl font-semibold text-gray-100 mb-6">
          {step === 1 && <>Add Rider Details</>}
          {step === 2 && <>Add Address Details</>}
          {step === 3 && <>Add Rider Documents</>}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {step === 1 && (
            <>
              <FlexTextInput
                label="First Name"
                name="firstName"
                type="text"
                value={riderData.firstName}
                onChange={handleInputChange}
                required
              />
              <FlexTextInput
                label="Middle Name"
                name="middleName"
                type="text"
                value={riderData.middleName}
                onChange={handleInputChange}
              />
              <FlexTextInput
                label="Last Name"
                name="lastName"
                type="text"
                onChange={handleInputChange}
                value={riderData.lastName}
              />
              <FlexTextInput
                label="Email"
                name="email"
                type="email"
                onChange={handleInputChange}
                required
                value={riderData.email}
              />
              <FlexTextInput
                label="Phone Number"
                type="text"
                name="phoneNumber"
                onChange={handleInputChange}
                required
                value={riderData.phoneNumber}
              />
              <FlexTextInput
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                onChange={handleInputChange}
                required
                value={riderData.dateOfBirth}
              />

              <div className="col-span-2 mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h3 className="col-span-2 text-lg font-medium text-gray-200 mb-2">
                Current Address
              </h3>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <FlexTextInput
                  label="Address Line 1"
                  type="text"
                  value={riderData.currentAddress.line1}
                  name="currentAddress.line1"
                  onChange={handleAddressChange}
                  required
                />
                <FlexTextInput
                  label="Address Line 2"
                  type="text"
                  value={riderData.currentAddress.line2}
                  name="currentAddress.line2"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Address Line 3"
                  type="text"
                  value={riderData.currentAddress.line3}
                  name="currentAddress.line3"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="City"
                  type="text"
                  required
                  value={riderData.currentAddress.city}
                  name="currentAddress.city"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="State"
                  type="text"
                  required
                  value={riderData.currentAddress.state}
                  name="currentAddress.state"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Pin Code"
                  type="text"
                  required
                  value={riderData.currentAddress.postalCode}
                  name="currentAddress.postalCode"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Country"
                  type="text"
                  required
                  value={riderData.currentAddress.country}
                  name="currentAddress.country"
                  onChange={handleAddressChange}
                />
              </div>

              <h3 className="col-span-2 text-lg font-medium text-gray-200 mt-6 mb-2">
                Permanent Address
              </h3>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <FlexTextInput
                  label="Address Line 1"
                  type="text"
                  required
                  value={riderData.permanentAddress.line1}
                  name="permanentAddress.line1"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Address Line 2"
                  type="text"
                  value={riderData.permanentAddress.line2}
                  name="permanentAddress.line2"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Address Line 3"
                  type="text"
                  value={riderData.permanentAddress.line3}
                  name="permanentAddress.line3"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="City"
                  type="text"
                  required
                  value={riderData.permanentAddress.city}
                  name="permanentAddress.city"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="State"
                  type="text"
                  required
                  value={riderData.permanentAddress.state}
                  name="permanentAddress.state"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Pin Code"
                  type="text"
                  required
                  value={riderData.permanentAddress.postalCode}
                  name="permanentAddress.postalCode"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Country"
                  type="text"
                  required
                  value={riderData.permanentAddress.country}
                  name="permanentAddress.country"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="col-span-2 mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <FlexFileInput
                label="Upload Rider Photo"
                type="file"
                accept=".pdf, .png, .jpg"
              />
              <FlexFileInput
                label="Upload Aadhar Card"
                type="file"
                accept=".pdf, .png, .jpg"
              />
              <FlexFileInput
                label="Upload PAN Card"
                type="file"
                accept=".pdf, .png, .jpg"
              />
              <FlexFileInput
                label="Upload Driving License"
                type="file"
                accept=".pdf, .png, .jpg"
              />
              <div className="col-span-2 mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg"
                >
                  Save Rider
                </button>
              </div>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AddRiderModal;
