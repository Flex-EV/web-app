import React from 'react';

interface FlexDropdownOption {
  value: string;
  label: string;
}

interface FlexDropdownProps {
  label: string;
  options: FlexDropdownOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const FlexDropdown: React.FC<FlexDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-white text-gray-900"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FlexDropdown;
