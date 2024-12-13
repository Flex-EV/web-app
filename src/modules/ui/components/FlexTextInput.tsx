import { TextInput } from '../model/TextInput.interface.ts';

const FlexTextInput = ({
  label,
  type = 'text',
  step,
  value,
  name,
  pattern,
  max,
  disabled,
  onChange,
  required = false,
}: TextInput) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        step={step}
        value={value}
        required={required}
        name={name}
        max={max}
        pattern={pattern}
        disabled={disabled}
        onChange={onChange}
        className="w-full bg-gray-100 text-gray-900 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
      />
    </div>
  );
};

export default FlexTextInput;
