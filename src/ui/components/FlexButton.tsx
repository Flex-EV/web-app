import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../model/Button.interface';

interface FlexButtonProps extends Button {
  disabled?: boolean;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const FlexButton: React.FC<FlexButtonProps> = ({
  text,
  type = 'button',
  variant = 'primary',
  loading = false,
  icon,
  fullWidth = false,
  ...props
}) => {
  const baseStyles =
    'px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ease-in-out focus:outline-none';

  const variantStyles = {
    primary:
      'bg-green-600 text-white hover:bg-green-500 active:bg-green-700 focus:ring-green-400',
    danger:
      'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 focus:ring-red-400',
    neutral:
      'bg-gray-500 text-white hover:bg-gray-400 active:bg-gray-700 focus:ring-gray-400',
  };

  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} relative flex items-center justify-center min-h-[2.5rem]`}
      disabled={loading || props.disabled}
      whileHover={{ scale: loading ? 1 : 1.025 }}
      whileTap={{ scale: loading ? 1 : 0.95 }}
      transition={{ duration: 0.1 }}
      onClick={props.onClick}
    >
      {loading ? (
        <div className="absolute animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4" />
      ) : (
        <span className="flex items-center gap-2 transform transition-transform duration-200 ease-in-out">
          {icon && <span>{icon}</span>}
          {text}
        </span>
      )}
    </motion.button>
  );
};

export default FlexButton;
