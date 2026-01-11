'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { CouponInput } from '@/components/molecules/CouponInput';
import { PriceDisplay } from '@/components/molecules/PriceDisplay';
import { PaymentGatewaySelector } from '@/components/organisms/PaymentGatewaySelector';
import { useCart } from '@/lib/hooks/useCart';
import { useCheckoutStore } from '@/store/checkoutStore';
import { calculateCheckoutTotals } from '@/lib/utils/calculations';

export interface CheckoutFormProps {
  serverId: string;
}

export function CheckoutForm({ serverId }: CheckoutFormProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, clearCart } = useCart();
  const { selectedGateway, appliedCoupon, reset } = useCheckoutStore();

  const { subtotal, discount, gatewayFee, total } = calculateCheckoutTotals(
    items,
    appliedCoupon,
    selectedGateway?.fee || 0
  );

  const handleSubmit = async () => {
    if (!selectedGateway) {
      toast.error('Selecione um método de pagamento');
      return;
    }

    setIsProcessing(true);

    // Simula processamento do pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('Pagamento processado com sucesso!');
    clearCart();
    reset();
    setIsProcessing(false);

    router.push(`/${serverId}/view`);
  };

  return (
    <div className="space-y-6">
      <PaymentGatewaySelector />

      <div className="bg-secondary rounded-lg p-6 border border-slate-700">
        <Typography variant="h3" className="mb-4">
          Cupom de Desconto
        </Typography>
        <CouponInput />
      </div>

      <div className="bg-secondary rounded-lg p-6 border border-slate-700">
        <Typography variant="h3" className="mb-4">
          Resumo do Pedido
        </Typography>
        <PriceDisplay
          subtotal={subtotal}
          discount={discount}
          gatewayFee={gatewayFee}
          total={total}
        />
      </div>

      <Button
        onClick={handleSubmit}
        variant="accent"
        className="w-full"
        size="lg"
        disabled={!selectedGateway || isProcessing}
      >
        {isProcessing ? 'Processando...' : 'Confirmar Pagamento'}
      </Button>
    </div>
  );
}
