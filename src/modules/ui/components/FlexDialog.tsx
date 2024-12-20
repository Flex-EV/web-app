import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface FlexDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
} as const;

const FlexDialog = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
  className,
}: FlexDialogProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const dialog = (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop with animation */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog positioning wrapper */}
      <div className="fixed inset-0 flex items-center justify-center p-6">
        {/* Dialog content */}
        <div
          className={`
            relative w-full bg-white rounded-xl shadow-xl
            transform transition-all duration-200
            border border-gray-200
            ${maxWidthClasses[maxWidth]}
            ${className || ''}
          `}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* Header with improved spacing */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 -mr-2"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="px-6 py-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <div className="space-y-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
};

export default FlexDialog;
