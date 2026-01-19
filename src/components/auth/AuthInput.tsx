'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isPassword?: boolean;
  showPasswordHints?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  isPassword = false,
  showPasswordHints = false,
  className,
  type,
  value,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const hasValue = value && String(value).length > 0;

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={inputType}
          value={value}
          className={cn(
            "w-full h-[58px] p-[30px_20px_10px_20px] bg-transparent rounded-[4px] border border-[#5A5A5A]",
            "text-white text-[15px] placeholder:text-transparent",
            "focus:outline-none focus:border-[#7A7A7A]",
            "transition-all duration-200",
            isPassword && "pr-12",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          {...props}
        />
        <label
          className={cn(
            "absolute left-[18px] transition-all duration-200 pointer-events-none text-[#A8A8A8]",
            (isFocused || hasValue) ? "top-[8px] text-[11px]" : "top-[19px] text-[15px]"
          )}
        >
          {placeholder}
        </label>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {showPasswordHints && isFocused && (
        <div
          className="mt-3 p-4 rounded-md overflow-hidden animate-slide-down bg-[rgba(255,255,255,0.03)]"
        >
          <p className="text-[13px] text-white mb-3 font-semibold">Sua senha deve ter pelo ao menos:</p>
          <ul className="space-y-2 text-[13px]">
            <li className="text-[#A8A8A8] flex items-start gap-2">
              <span className="text-[#A8A8A8] mt-[2px]">•</span>
              <span>Mínimo de 8 caracteres</span>
            </li>
            <li className="text-[#A8A8A8] flex items-start gap-2">
              <span className="text-[#A8A8A8] mt-[2px]">•</span>
              <span>Incluir 1 número</span>
            </li>
            <li className="text-[#A8A8A8] flex items-start gap-2">
              <span className="text-[#A8A8A8] mt-[2px]">•</span>
              <span>1 letra maiúscula e minúscula</span>
            </li>
            <li className="text-[#A8A8A8] flex items-start gap-2">
              <span className="text-[#A8A8A8] mt-[2px]">•</span>
              <span>Nenhum espaço em branco</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuthInput;

