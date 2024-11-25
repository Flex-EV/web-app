import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import FlexTextInput from '@/ui/components/FlexTextInput';
import FlexFileInput from '@/ui/components/FlexFileInput';
import {
  MAX_STEP,
  MIN_STEP,
  RIDER_DATA_INITIAL_STATE,
} from '../data/AddRider.data';
import { AddRiderProps, RiderData } from '../model/AddRider.interface';
import FlexButton from '@/ui/components/FlexSubmitButton';
import { Gender } from '../enum/Gender.enum';
import { PHONE_NUMBER_REGEX_PATTERN } from '../validation/RegexPattern';

const AddRider = ({ isOpen, onClose }: AddRiderProps) => {
  const [step, setStep] = useState(1);
  const [check, setCheck] = useState(false);
  const [riderData, setRiderData] = useState<RiderData>(
    RIDER_DATA_INITIAL_STATE
  );

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((i) => {
      if (i >= MAX_STEP) return i;
      return i + MIN_STEP;
    });
  };
  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((i) => {
      if (i <= MIN_STEP) return i;
      return i - MIN_STEP;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'photo' | 'aadhar' | 'pan' | 'dl'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setRiderData((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleCheckChange = () => {
    const newCheckState = !check;
    setCheck(newCheckState);

    if (newCheckState) {
      setRiderData((prev) => ({
        ...prev,
        permanentAddress: {
          ...prev.currentAddress,
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    setRiderData(RIDER_DATA_INITIAL_STATE);
    setCheck(false);
    setStep(1);
    alert('Data Submitted');
    console.log(riderData);
  };
  const handleClose = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    setRiderData(RIDER_DATA_INITIAL_STATE);
    setCheck(false);
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
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold text-gray-100 mb-6">
          {step === 1 && <>Add Rider Details</>}
          {step === 2 && <>Add Address Details</>}
          {step === 3 && <>Add Rider Documents</>}
        </h2>

        <form onSubmit={handleNext} className="grid grid-cols-2 gap-4">
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
                name="phoneNumber"
                type="phoneNumber"
                pattern={PHONE_NUMBER_REGEX_PATTERN}
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

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={riderData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={Gender.Male}>Male</option>
                  <option value={Gender.Female}>Female</option>
                  <option value={Gender.Other}>Other</option>
                </select>
              </div>

              <div className="col-span-2 mt-6 flex justify-end gap-4">
                <FlexButton type="submit" variant="primary" text="Next" />
              </div>
            </>
          )}
        </form>
        <form onSubmit={handleNext} className="grid grid-cols-2 gap-4">
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
              <div className="col-span-2 flex items-center gap-4 mt-6 mb-2">
                <h3 className="text-lg font-medium text-gray-200">
                  Permanent Address
                </h3>
                <div className="flex items-center gap-2 ml-32">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    value="checkbox"
                    name="checkbox"
                    onChange={handleCheckChange}
                  />
                  <label
                    htmlFor="checkbox"
                    className="text-lg font-medium text-gray-200"
                  >
                    Same as Current Address
                  </label>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4">
                <FlexTextInput
                  label="Address Line 1"
                  type="text"
                  required
                  disabled={check}
                  value={riderData.permanentAddress.line1}
                  name={'permanentAddress.line1'}
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Address Line 2"
                  type="text"
                  disabled={check}
                  value={riderData.permanentAddress.line2}
                  name="permanentAddress.line2"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Address Line 3"
                  type="text"
                  disabled={check}
                  value={riderData.permanentAddress.line3}
                  name="permanentAddress.line3"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="City"
                  type="text"
                  required
                  disabled={check}
                  value={riderData.permanentAddress.city}
                  name="permanentAddress.city"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="State"
                  type="text"
                  required
                  disabled={check}
                  value={riderData.permanentAddress.state}
                  name="permanentAddress.state"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Pin Code"
                  type="text"
                  required
                  disabled={check}
                  value={riderData.permanentAddress.postalCode}
                  name="permanentAddress.postalCode"
                  onChange={handleAddressChange}
                />
                <FlexTextInput
                  label="Country"
                  type="text"
                  required
                  disabled={check}
                  value={riderData.permanentAddress.country}
                  name="permanentAddress.country"
                  onChange={handleAddressChange}
                />
              </div>
              <div className="col-span-2 mt-6 flex justify-end gap-4">
                <FlexButton
                  type="button"
                  variant="neutral"
                  text="Back"
                  onClick={handleBack}
                />
                <FlexButton type="submit" variant="primary" text="Next" />
              </div>
            </>
          )}
        </form>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {step === 3 && (
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
                onChange={(e) => handleFileChange(e, 'aadhar')}
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
                onChange={(e) => handleFileChange(e, 'dl')}
                required
              />
              <div className="col-span-2 mt-6 flex justify-end gap-4">
                <FlexButton
                  type="button"
                  variant="neutral"
                  text="Back"
                  onClick={handleBack}
                />
                <FlexButton type="submit" variant="primary" text="Submit" />
              </div>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AddRider;
