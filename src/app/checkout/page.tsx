'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/hooks/useCart';
import { CheckoutTemplate } from '@/components/templates/CheckoutTemplate';

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCart();

  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  return <CheckoutTemplate serverId="default" serverName="Loja Virtual" />;
}
