import React, { ReactNode, useCallback, useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { NotificationContext } from '../context/NotificationContext.ts';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  type: NotificationType;
  message: string;
  duration?: number;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'center';
}

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  const showNotification = useCallback((props: NotificationProps) => {
    setNotification(props);
  }, []);

  const handleClose = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && <Notification {...notification} onClose={handleClose} />}
    </NotificationContext.Provider>
  );
};

// Notification Component
const Notification: React.FC<NotificationProps & { onClose: () => void }> = ({
  type,
  message,
  duration = 3000,
  position = 'top-right',
  onClose,
}) => {
  // Auto-close effect
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Position mapping
  const positionClasses = {
    'top-right': 'top-4 right-4 justify-end',
    'top-left': 'top-4 left-4 justify-start',
    'bottom-right': 'bottom-4 right-4 justify-end',
    'bottom-left': 'bottom-4 left-4 justify-start',
    center:
      'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center',
  };

  // Notification configurations
  const notificationVariants = {
    success: {
      icon: CheckCircle2,
      iconClass: 'text-green-600',
      bgClass: 'bg-green-50',
      borderClass: 'border-green-200',
    },
    error: {
      icon: XCircle,
      iconClass: 'text-red-600',
      bgClass: 'bg-red-50',
      borderClass: 'border-red-200',
    },
    info: {
      icon: Info,
      iconClass: 'text-blue-600',
      bgClass: 'bg-blue-50',
      borderClass: 'border-blue-200',
    },
    warning: {
      icon: AlertTriangle,
      iconClass: 'text-yellow-600',
      bgClass: 'bg-yellow-50',
      borderClass: 'border-yellow-200',
    },
  };

  // Render center position with full overlay
  const renderCenterNotification = () => {
    const variant = notificationVariants[type];
    const Icon = variant.icon;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div
          className={`
          w-80 
          rounded-xl 
          shadow-lg 
          p-6 
          flex 
          flex-col 
          items-center 
          ${variant.bgClass} 
          ${variant.borderClass} 
          border
        `}
        >
          <Icon
            className={`w-24 h-24 mb-4 ${variant.iconClass} animate-bounce`}
          />
          <p className="text-xl font-semibold text-center text-gray-800">
            {message}
          </p>
        </div>
      </div>
    );
  };

  // Standard notification for other positions
  const renderStandardNotification = () => {
    const variant = notificationVariants[type];
    const Icon = variant.icon;

    return (
      <div
        className={`
          fixed 
          ${positionClasses[position]} 
          z-50 
          flex 
          items-center 
          p-4 
          rounded-lg 
          shadow-lg 
          ${variant.bgClass} 
          ${variant.borderClass} 
          border 
          animate-slide-in
        `}
        role="alert"
        aria-live="polite"
      >
        <Icon className={`w-6 h-6 mr-3 ${variant.iconClass} animate-bounce`} />
        <span className="text-gray-800 font-medium flex-grow">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
          aria-label="Close notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  };

  // Render based on position
  if (position === 'center') {
    return renderCenterNotification();
  }

  return renderStandardNotification();
};

export default NotificationProvider;
