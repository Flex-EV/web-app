import { TextInput } from '@/pages/rider-management/model/AddRider.interface';

const FlexTextInput = ({
  label,
  type,
  value,
  name,
  pattern,
  disabled,
  onChange,
  required = false,
}: TextInput) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        name={name}
        pattern={pattern}
        disabled={disabled}
        onChange={onChange}
        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FlexTextInput;
