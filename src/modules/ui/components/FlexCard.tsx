import React from 'react';

type FlexCardProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  actionButton?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  isLoading?: boolean;
  hover?: boolean;
};

const FlexCard = ({
  title,
  children,
  footer,
  actionButton,
  description,
  className = '',
  variant = 'default',
  icon,
  isLoading,
  hover = false,
}: FlexCardProps) => {
  // Base classes for variants
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    secondary: 'bg-gray-50 border border-gray-200',
    ghost: 'bg-transparent',
  };

  // Combine all classes
  const cardClasses = [
    'rounded-lg',
    'overflow-hidden',
    variantClasses[variant],
    hover
      ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const headerClasses = ['px-6', 'py-4', 'border-b', 'border-gray-100'].join(
    ' '
  );

  const contentClasses = ['px-6', 'py-4'].join(' ');

  const footerClasses = ['px-6', 'py-4', 'border-t', 'border-gray-100'].join(
    ' '
  );

  return (
    <div className={cardClasses}>
      <div className={headerClasses}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-gray-500">{icon}</span>}
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          {actionButton && <div className="flex-shrink-0">{actionButton}</div>}
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      <div className={contentClasses}>
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ) : (
          children
        )}
      </div>

      {footer && <div className={footerClasses}>{footer}</div>}
    </div>
  );
};

export default FlexCard;
