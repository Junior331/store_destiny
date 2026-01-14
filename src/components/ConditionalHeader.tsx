'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';

const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/email-sent', '/select-server'];

export function ConditionalHeader() {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isAuthRoute) {
    return null;
  }

  return <Header />;
}

