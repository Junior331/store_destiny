'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface AuthCheckboxProps {
  id: string;
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const AuthCheckbox: React.FC<AuthCheckboxProps> = ({ 
  id, 
  label, 
  checked = false, 
  onChange,
  className 
}) => {
  return (
    <label 
      htmlFor={id}
      className={cn("flex items-center gap-2 cursor-pointer group", className)}
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only"
        />
        <div 
          className={cn(
            "w-5 h-5 rounded border-2 transition-all duration-200",
            "flex items-center justify-center",
            checked 
              ? "bg-primary border-primary" 
              : "border-muted-foreground group-hover:border-primary"
          )}
        >
          {checked && <Check size={14} className="text-primary-foreground" />}
        </div>
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </label>
  );
};

export default AuthCheckbox;

