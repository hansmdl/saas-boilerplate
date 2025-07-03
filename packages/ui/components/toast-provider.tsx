import * as React from 'react';
import { Toast, ToastProps } from './toast';

interface ToastContextType {
  addToast: (message: string, type?: ToastProps['type'], duration?: number) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((message: string, type?: ToastProps['type'], duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9); // Simple unique ID
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
    // Remove toast after its duration
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration || 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
