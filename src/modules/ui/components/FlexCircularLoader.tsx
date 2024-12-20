import React from 'react';

interface FlexCircularLoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'danger' | 'warning';
  thickness?: 'thin' | 'normal' | 'thick';
  speed?: 'slow' | 'normal' | 'fast';
}

const FlexCircularLoader: React.FC<FlexCircularLoaderProps> = ({
  size = 'md',
  color = 'primary',
  thickness = 'normal',
  speed = 'normal',
}) => {
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorMap = {
    primary: 'border-green-600',
    secondary: 'border-gray-600',
    white: 'border-white',
    danger: 'border-red-600',
    warning: 'border-yellow-500',
  };

  const thicknessMap = {
    thin: 'border-2',
    normal: 'border-4',
    thick: 'border-6',
  };

  const sizeClass = sizeMap[size] || sizeMap.md;
  const colorClass = colorMap[color] || colorMap.primary;
  const thicknessClass = thicknessMap[thickness] || thicknessMap.normal;

  return (
    <div
      className={`
        ${sizeClass}
        ${thicknessClass}
        border-solid
        rounded-full
        animate-spin
        border-t-transparent
        ${colorClass}
      `}
      style={{
        animationDuration:
          speed === 'slow' ? '1.5s' : speed === 'fast' ? '0.5s' : '1s',
      }}
      role="status"
      aria-label="loading"
    />
  );
};

export default FlexCircularLoader;
