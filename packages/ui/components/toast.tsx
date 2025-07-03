import * as React from 'react';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number; // in milliseconds
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000 }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md text-white shadow-lg ${bgColor}`}
      role="alert"
    >
      {message}
      {/* TODO: Add a close button */}
    </div>
  );
};

// TODO: Implement a ToastProvider and useToast hook for managing multiple toasts
