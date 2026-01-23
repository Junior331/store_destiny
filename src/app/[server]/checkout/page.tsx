'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCart } from '@/lib/hooks/useCart';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { CheckoutTemplate } from '@/components/templates/CheckoutTemplate';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function ServerCheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const serverSlug = params.server as string;

  const { items } = useCart();
  const { isAuthenticated } = useAuthStore();
  const { selectedServer, servers } = useServerStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Verifica se o servidor está correto
    const server = servers.find(s => s.slug === serverSlug);
    if (!server) {
      router.push('/select-server');
      return;
    }

    // Redireciona se carrinho vazio
    if (items.length === 0) {
      router.push(`/${serverSlug}/view`);
    }
  }, [items.length, isAuthenticated, router, serverSlug, servers]);

  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  return (
    <AuthGuard>
      <CheckoutTemplate
        serverId={selectedServer?.id || ''}
        serverName={selectedServer?.name || 'Servidor'}
        serverSlug={serverSlug}
      />
    </AuthGuard>
  );
}
