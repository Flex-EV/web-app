import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullHeight?: boolean;
  padding?: 'small' | 'medium' | 'large';
  gap?: boolean;
  variant?: 'default' | 'transparent' | 'outlined';
  title?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  fullHeight = false,
  padding = 'medium',
  gap = false,
  variant = 'default',
  title,
  ...rest
}) => {
  const paddingClasses = {
    small: 'p-3',
    medium: 'p-6',
    large: 'p-8',
  };

  const titleSizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
  };

  const variantClasses = {
    default: 'bg-white shadow-lg',
    transparent: 'bg-transparent shadow-none',
    outlined: 'bg-white border border-gray-200 shadow-sm',
  };

  return (
    <div
      {...rest}
      className={twMerge(
        'flex flex-col rounded-lg',
        fullHeight && 'h-full',
        paddingClasses[padding],
        gap && 'gap-5',
        variantClasses[variant],
        className
      )}
    >
      {title && (
        <h2
          className={twMerge(
            'font-bold text-gray-800 mb-4 border-b pb-2',
            titleSizeClasses[padding]
          )}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Container;
