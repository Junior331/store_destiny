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
  tooltip?: string;
}

const AuthCheckbox: React.FC<AuthCheckboxProps> = ({
  id,
  label,
  checked = false,
  onChange,
  className,
  tooltip
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn("flex items-center gap-[10px] cursor-pointer group", className)}
      >
        <div className="relative flex-shrink-0 h-[18px]">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            className="peer w-[18px] h-[18px] rounded-[3px] border-2 border-[#5A5A5A] bg-transparent appearance-none cursor-pointer transition-all duration-200 checked:bg-[#2B8CE7] checked:border-[#2B8CE7]"
          />
          <Check
            size={12}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
            strokeWidth={3}
          />
        </div>
        <span className="text-[14px] text-[#A8A8A8]">{label}</span>
      </label>

      {tooltip && checked && (
        <div className="absolute left-0 top-full mt-[8px] w-[133px] bg-[#3B3B3B] rounded-[6px] p-2 shadow-lg z-10 animate-slide-down">
          <p className="text-[10px] text-[#A8A8A8] leading-[1.4] text-center">
            {tooltip}
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthCheckbox;

