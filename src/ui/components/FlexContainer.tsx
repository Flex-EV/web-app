import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  padding?: 'small' | 'medium' | 'large';
  gap?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  fullHeight = false,
  padding = 'medium',
  gap = false,
}) => {
  const paddingClasses = {
    small: 'p-3',
    medium: 'p-6',
    large: 'p-8',
  };

  return (
    <div
      className={`
        bg-white 
        rounded-lg 
        shadow-lg 
        flex 
        flex-col 
        ${fullHeight ? 'h-full' : ''}
        ${paddingClasses[padding]}
        ${gap ? 'gap-5' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
