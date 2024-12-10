import { ChangeEventHandler } from 'react';

export interface TextInput {
  label: string;
  type?: string;
  step?: string;
  value: string;
  name: string;
  disabled?: boolean;
  max?: string;
  pattern?: string;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
