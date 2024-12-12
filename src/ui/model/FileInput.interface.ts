import React from 'react';

export interface FileInputProps {
  label?: string;
  type?: 'file';
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  maxSizeInMB?: number;
  multiple?: boolean;
  className?: string;
}
