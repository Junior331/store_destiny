'use client';

import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/types';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { formatCurrency } from '@/lib/utils/formatters';
import { useCart } from '@/lib/hooks/useCart';

export interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => {
    if (quantity < 15) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    updateQuantity(product.id, quantity - 1);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const price = product.discountedPrice || product.originalPrice;
  const subtotal = price * quantity;

  return (
    <div className="bg-secondary rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all">
      <div className="flex gap-4">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <Typography variant="h4" className="truncate pr-2">
              {product.name}
            </Typography>
            <Button
              onClick={handleRemove}
              variant="ghost"
              size="sm"
              className="flex-shrink-0"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>

          <Typography variant="small" className="mb-3">
            {formatCurrency(price)} cada
          </Typography>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDecrement}
                variant="outline"
                size="sm"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <Typography variant="body" className="min-w-[2rem] text-center font-semibold">
                {quantity}
              </Typography>
              <Button
                onClick={handleIncrement}
                variant="outline"
                size="sm"
                disabled={quantity >= 15}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>

            <Typography variant="h4" className="text-white font-bold">
              {formatCurrency(subtotal)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
