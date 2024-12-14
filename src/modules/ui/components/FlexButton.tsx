import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Button } from '../model/Button.interface.ts';

type OmittedButtonProps = Omit<Button, 'type' | 'variant'>;

interface FlexButtonProps
  extends OmittedButtonProps,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      keyof OmittedButtonProps
    > {
  type?: Button['type'];
  variant?: Button['variant'];
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconPosition?: 'left' | 'right';
}

const FlexButton: React.FC<FlexButtonProps> = ({
  text,
  type = 'button',
  variant = 'primary',
  loading = false,
  icon,
  fullWidth = false,
  size = 'md',
  iconPosition = 'left',
  className,
  ...props
}) => {
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-5 py-2.5 text-lg rounded-lg',
    xl: 'px-6 py-3 text-xl rounded-xl',
  };

  const variantStyles = {
    primary: {
      base: 'bg-green-600 text-white hover:bg-green-500 active:bg-green-700 focus:ring-green-400',
      loading: 'bg-green-500',
    },
    danger: {
      base: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 focus:ring-red-400',
      loading: 'bg-red-500',
    },
    neutral: {
      base: 'bg-gray-500 text-white hover:bg-gray-400 active:bg-gray-700 focus:ring-gray-400',
      loading: 'bg-gray-400',
    },
    outline: {
      base: 'bg-transparent border border-green-600 text-green-600 hover:bg-green-50 active:bg-green-100 focus:ring-green-400',
      loading: 'bg-green-50 text-green-500',
    },
  };

  const baseStyles =
    'font-medium transition-all duration-300 ease-in-out focus:outline-none';
  const widthClass = fullWidth ? 'w-full' : 'w-auto';
  const disabledClass =
    loading || props.disabled ? 'cursor-not-allowed opacity-60' : '';

  return (
    <motion.button
      type={type}
      className={twMerge(
        baseStyles,
        sizeClasses[size],
        variantStyles[variant].base,
        widthClass,
        disabledClass,
        'relative flex items-center justify-center min-h-[2.5rem]',
        className
      )}
      disabled={loading || props.disabled}
      whileHover={{ scale: loading ? 1 : 1.025 }}
      whileTap={{ scale: loading ? 1 : 0.95 }}
      transition={{ duration: 0.1 }}
      {...(props as MotionProps)}
    >
      {loading ? (
        <div
          className={`absolute animate-spin border-2 border-t-transparent ${
            variant === 'outline' ? 'border-green-500' : 'border-white'
          } rounded-full w-4 h-4`}
        />
      ) : (
        <span className="flex items-center gap-2 transform transition-transform duration-200 ease-in-out">
          {icon && iconPosition === 'left' && <span>{icon}</span>}
          {text}
          {icon && iconPosition === 'right' && <span>{icon}</span>}
        </span>
      )}
    </motion.button>
  );
};

export default FlexButton;
