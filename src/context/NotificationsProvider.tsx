import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Alert } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';

import classes from './NotificationsProvider.module.css';

type NotificationData = {
  message: string;
  variant?: Variant;
  timeout?: number;
};

type Notification = {
  message: string;
  variant: Variant;
  id: number;
};

export interface NotificationContextProps {
  showNotification: (notification: NotificationData) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  showNotification: ({}) => {}
});

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    ({ message, variant = 'success', timeout = 500000 }: NotificationData) => {
      const id = new Date().getTime();
      setNotifications((prevNotifications) => [...prevNotifications, { id, message, variant }]);

      setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      }, timeout);
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {createPortal(
        <div className={classes.notificationsContainer}>
          {notifications.map(({ id, message, variant }) => (
            <Alert
              key={id}
              variant={variant}
              onClose={() =>
                setNotifications((prevNotifications) =>
                  prevNotifications.filter((notification) => notification.id !== id)
                )
              }
              dismissible>
              <div className={classes.message}>{message}</div>
            </Alert>
          ))}
        </div>,
        document.body
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
