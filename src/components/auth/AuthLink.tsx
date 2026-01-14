'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils/cn';

interface AuthLinkProps extends Omit<LinkProps<string>, 'className'> {
  children: React.ReactNode;
  className?: string;
}

const AuthLink: React.FC<AuthLinkProps> = ({ children, className, ...props }) => {
  return (
    <Link
      {...props}
      className={cn(
        "text-primary hover:text-primary/80 underline underline-offset-2",
        "transition-colors duration-200",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default AuthLink;

