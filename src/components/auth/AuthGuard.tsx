'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push('/login');
    } else if (!requireAuth && isAuthenticated && pathname === '/login') {
      // Se já está logado e tenta acessar login, redireciona para loja
      router.push('/loja');
    }
  }, [isAuthenticated, requireAuth, router, pathname]);

  // Se requer autenticação e não está autenticado, não renderiza nada
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

