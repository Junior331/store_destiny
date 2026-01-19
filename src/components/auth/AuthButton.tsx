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
        "w-full h-[58px] rounded-[4px] font-semibold uppercase tracking-wide text-sm",
        "transition-all duration-200",
        "focus:outline-none",
        variant === 'primary' && [
          "bg-[#2181D2] text-white",
          "hover:bg-[#0D63AC]",
          "disabled:bg-[#2181D2]/50"
        ],
        variant === 'secondary' && [
          "bg-transparent text-white border border-[#5A5A5A]",
          "hover:bg-white/5"
        ],
        "disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="25 25 50 50">
            <circle
              r="20"
              cy="50"
              cx="50"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray="80, 200"
              strokeDashoffset="0"
            />
          </svg>
          <span className="button-text">Carregando...</span>
        </span>
      ) : (
        <span className="button-text">{children}</span>
      )}
    </button>
  );
};

export default AuthButton;

