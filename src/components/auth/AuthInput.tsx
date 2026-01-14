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
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-muted-foreground mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "w-full px-4 py-3 bg-input rounded-md border border-border",
            "text-card-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-all duration-200",
            isPassword && "pr-12",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {showPasswordHints && isFocused && (
        <div
          className="mt-2 p-3 rounded-md overflow-hidden animate-slide-down"
        >
          <p className="text-xs text-muted-foreground mb-2">Sua senha deve ter pelo ao menos:</p>
          <ul className="space-y-1 text-xs">
            <li className="text-emerald-400 flex items-center gap-2">
              <span className="text-emerald-400">•</span>
              Mínimo de 8 caracteres
            </li>
            <li className="text-emerald-400 flex items-center gap-2">
              <span className="text-emerald-400">•</span>
              Incluir 1 número
            </li>
            <li className="text-emerald-400 flex items-center gap-2">
              <span className="text-emerald-400">•</span>
              1 letra maiúscula e 1 minúscula
            </li>
            <li className="text-emerald-400 flex items-center gap-2">
              <span className="text-emerald-400">•</span>
              Nenhum espaço em branco
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuthInput;

