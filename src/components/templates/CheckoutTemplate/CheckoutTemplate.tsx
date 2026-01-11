'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { CartItem } from '@/components/molecules/CartItem';
import { CheckoutForm } from '@/components/organisms/CheckoutForm';
import { useCart } from '@/lib/hooks/useCart';

export interface CheckoutTemplateProps {
  serverId: string;
  serverName: string;
}

export function CheckoutTemplate({
  serverId,
  serverName,
}: CheckoutTemplateProps) {
  const router = useRouter();
  const { items } = useCart();

  useEffect(() => {
    // Redirecionar para /view se carrinho vazio
    if (items.length === 0) {
      router.push(`/${serverId}/view`);
    }
  }, [items.length, router, serverId]);

  const handleBackToStore = () => {
    router.push(`/${serverId}/view`);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button
          onClick={handleBackToStore}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para loja
        </Button>

        <div className="mb-8">
          <Typography variant="h1" className="mb-2">
            Finalizar Compra
          </Typography>
          <Typography variant="body">
            {serverName}
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-secondary rounded-lg p-6 border border-slate-700">
              <Typography variant="h3" className="mb-4">
                Itens do Carrinho
              </Typography>
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <CheckoutForm serverId={serverId} />
          </div>
        </div>
      </div>
    </div>
  );
}
