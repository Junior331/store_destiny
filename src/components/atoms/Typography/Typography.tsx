import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold text-white',
      h2: 'text-3xl font-bold text-white',
      h3: 'text-2xl font-semibold text-white',
      h4: 'text-xl font-semibold text-white',
      body: 'text-base text-gray-300',
      small: 'text-sm text-gray-400',
      caption: 'text-xs text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export interface TypographyProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function Typography({
  className,
  variant,
  as: Component = 'p',
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
}
