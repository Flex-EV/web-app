import { createContext } from 'react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationProps {
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

interface NotificationContextType {
  showNotification: (props: NotificationProps) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
