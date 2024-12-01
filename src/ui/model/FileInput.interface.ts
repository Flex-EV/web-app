import { ChangeEventHandler } from 'react';

export interface FileInput {
  label: string;
  type: string;
  accept: string;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
