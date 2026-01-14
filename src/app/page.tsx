'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { PageLoader } from '@/components/atoms/PageLoader';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { selectedServer } = useServerStore();

  useEffect(() => {
    if (isAuthenticated) {
      if (selectedServer) {
        router.push('/loja' as any);
      } else {
        router.push('/select-server' as any);
      }
    } else {
      router.push('/login' as any);
    }
  }, [isAuthenticated, selectedServer, router]);

  return <PageLoader isLoading={true} />;
}