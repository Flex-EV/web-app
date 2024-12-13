import React from 'react';

export interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'reset' | 'button';
  text: string;
  variant: 'primary' | 'danger' | 'neutral' | 'outline';
  loading?: boolean;
}
