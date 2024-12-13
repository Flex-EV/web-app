import React, { useRef, useState } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileInputProps } from '@/modules/ui/model/FileInput.interface.ts';

const FlexFileInput: React.FC<FileInputProps> = ({
  label,
  type = 'file',
  accept,
  onChange,
  required = false,
  maxSizeInMB = 5,
  multiple = false,
  className = '',
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Reset previous errors
    setError(null);

    if (event.target.files) {
      const files = Array.from(event.target.files);

      // Validate file size
      const oversizedFiles = files.filter(
        (file) => file.size > maxSizeInMB * 1024 * 1024
      );
      if (oversizedFiles.length > 0) {
        setError(`File(s) exceed maximum size of ${maxSizeInMB}MB`);
        return;
      }

      // Set files
      setSelectedFiles(files);

      // Call external onChange if provided
      if (onChange) {
        onChange(event);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = Array.from(event.dataTransfer.files);

    // Validate file size
    const oversizedFiles = droppedFiles.filter(
      (file) => file.size > maxSizeInMB * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      setError(`File(s) exceed maximum size of ${maxSizeInMB}MB`);
      return;
    }

    setSelectedFiles(droppedFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);

    // Reset input to allow re-selecting same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderFileList = () => (
    <AnimatePresence>
      {selectedFiles.map((file, index) => (
        <motion.div
          key={file.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-2"
        >
          <div className="flex items-center space-x-2">
            <FileText size={20} className="text-gray-600" />
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
            <span className="text-xs text-gray-500">
              ({(file.size / 1024).toFixed(1)} KB)
            </span>
          </div>
          <button
            onClick={() => removeFile(index)}
            className="text-red-500 hover:text-red-700 transition"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  );

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-6 
          flex flex-col items-center justify-center 
          transition duration-300 
          ${
            selectedFiles.length
              ? 'border-green-300 bg-green-50 hover:bg-green-100'
              : 'border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-400'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type={type}
          accept={accept}
          onChange={handleFileChange}
          required={required}
          multiple={multiple}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center text-center">
          <Upload
            size={40}
            className={`
              mb-4 
              ${
                selectedFiles.length
                  ? 'text-green-500'
                  : 'text-gray-400 group-hover:text-gray-600'
              }
            `}
          />
          <p className="text-sm text-gray-600 mb-2">
            {selectedFiles.length
              ? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`
              : 'Drag and drop files here or click to upload'}
          </p>
          <p className="text-xs text-gray-400">
            {accept ? `Supported: ${accept}` : 'All file types'}
            {` | Max: ${maxSizeInMB}MB`}
          </p>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm mt-2 flex items-center"
        >
          <X size={16} className="mr-2" />
          {error}
        </motion.div>
      )}

      {renderFileList()}
    </div>
  );
};

export default FlexFileInput;
