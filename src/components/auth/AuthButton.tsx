'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
  children, 
  variant = 'primary',
  isLoading = false,
  className,
  disabled,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "w-full py-3.5 rounded-md font-semibold uppercase tracking-wide text-sm",
        "transition-all duration-200 transform",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card",
        variant === 'primary' && [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 hover:scale-[1.02]",
          "focus:ring-primary",
          "disabled:bg-primary/50"
        ],
        variant === 'secondary' && [
          "bg-muted text-muted-foreground",
          "hover:bg-muted/80",
          "focus:ring-muted"
        ],
        "disabled:cursor-not-allowed disabled:transform-none",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" cy="12" r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none" 
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" 
            />
          </svg>
          Carregando...
        </span>
      ) : children}
    </button>
  );
};

export default AuthButton;

