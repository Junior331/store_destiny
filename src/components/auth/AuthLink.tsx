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
        "text-white hover:text-white/80",
        "transition-colors duration-200",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default AuthLink;

