import { ShoppingCart } from 'lucide-react';

export type PulseButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface PulseButtonProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  size?: PulseButtonSize;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

const sizes = {
  sm: { padding: 'py-1 px-3', text: 'text-sm', icon: 16, gap: 'gap-1.5' },
  md: { padding: 'py-1.5 px-4', text: 'text-base', icon: 18, gap: 'gap-2' },
  lg: { padding: 'py-2 px-5', text: 'text-lg', icon: 20, gap: 'gap-2.5' },
  xl: { padding: 'py-2.5 px-6', text: 'text-xl', icon: 24, gap: 'gap-3' }
};

export default function PulseButton({
  onClick,
  size = 'md',
  disabled = false,
  children = 'Adicionar',
  className = '',
  showIcon = true,
  ...props
}: PulseButtonProps) {
  const config = sizes[size];

  return (
      <div
        {...props}
        onClick={disabled ? undefined : onClick}
        className={`
          border-2 border-white rounded-full ${config.padding}
          flex ${config.gap} justify-center items-center
          cursor-pointer select-none
          animate-pulse-custom
          transition-transform duration-200
          hover:bg-white/10
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
      >
        {children}
      </div>
  );
}
