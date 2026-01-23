'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/email-sent'];

export function ConditionalFooter() {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isAuthRoute) {
    return null;
  }

  return <Footer />;
}



