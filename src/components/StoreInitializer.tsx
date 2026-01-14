'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';

export function StoreInitializer() {
  const initAuth = useAuthStore((state) => state.init);
  const initServer = useServerStore((state) => state.init);

  useEffect(() => {
    initAuth();
    initServer();
  }, [initAuth, initServer]);

  return null;
}

