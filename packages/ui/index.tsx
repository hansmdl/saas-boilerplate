import * as React from 'react';

// TODO: Integrate with shadcn/ui's button component and extend its functionality
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Add any specific props for your button here
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
          ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
          disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
