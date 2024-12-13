import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface FlexModalProps {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

const FlexModal: React.FC<FlexModalProps> = ({
  title,
  children,
  onClose,
  className,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative bg-white rounded-lg p-8 max-h-[90vh] w-full max-w-2xl shadow-lg overflow-auto ${className}`}
      >
        {/* Close Button with Animation */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 focus:outline-none"
          aria-label="Close"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <X size={24} />
        </motion.button>

        {/* Modal Title */}
        {title && (
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center leading-tight tracking-wide">
            {title}
          </h2>
        )}

        {/* Modal Content */}
        <div className="space-y-4">{children}</div>
      </motion.div>
    </div>
  );
};

export default FlexModal;
