'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/hooks/useCart';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { CheckoutTemplate } from '@/components/templates/CheckoutTemplate';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCart();
  const { isAuthenticated } = useAuthStore();
  const { selectedServer } = useServerStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (items.length === 0) {
      router.push('/loja');
    }
  }, [items.length, isAuthenticated, router]);

  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  return (
    <AuthGuard>
      <CheckoutTemplate
        serverId={selectedServer?.id || ''}
        serverName={selectedServer?.name || 'Servidor'}
      />
    </AuthGuard>
  );
}
