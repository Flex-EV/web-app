import { FileInput } from '../model/FileInput.interface';

const FlexFileInput = ({
  label,
  type,
  accept,
  onChange,
  required = false,
}: FileInput) => {
  return (
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
        <input
          type={type}
          accept={accept}
          onChange={onChange}
          required={required}
          className="w-full text-gray-300"
        />
      </div>
    </div>
  );
};

export default FlexFileInput;
