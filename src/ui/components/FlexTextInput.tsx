import { TextInput } from '../model/TextInput.interface';

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
      <label className="block text-sm font-medium text-gray-300 mb-1">
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
        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FlexTextInput;
