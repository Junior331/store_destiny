'use client';

import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { CartItem } from '@/components/molecules/CartItem';
import { useCart } from '@/lib/hooks/useCart';

export interface CartSummaryProps {
  serverId: string;
}

export function CartSummary({ serverId }: CartSummaryProps) {
  const router = useRouter();
  const { items, getItemCount } = useCart();

  const handleCheckout = () => {
    // router.push(`/${serverId}/checkout`);
  };

  if (items.length === 0) {
    return (
      <div className="bg-secondary rounded-lg p-6 border border-slate-700">
        <div className="text-center py-8">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-500" />
          <Typography variant="body" className="text-gray-400">
            Seu carrinho está vazio
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-lg p-6 border border-slate-700 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h3">Carrinho</Typography>
        <Typography variant="body" className="text-gray-400">
          {getItemCount()} {getItemCount() === 1 ? 'item' : 'itens'}
        </Typography>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      <Button onClick={handleCheckout} variant="primary" className="w-full mt-6">
        Finalizar Compra
      </Button>
    </div>
  );
}
