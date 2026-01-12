'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CouponInput } from '@/components/molecules/CouponInput';
import { PaymentGatewaySelector } from '@/components/molecules/PaymentGatewaySelector';
import { PaymentGateway } from '@/components/atoms/PaymentGatewayButton';
import { useCart } from '@/lib/hooks/useCart';
import { useCheckoutStore } from '@/store/checkoutStore';

export interface CheckoutFormProps {
  serverId: string;
}

export function CheckoutForm({ serverId }: CheckoutFormProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentGateway>();
  const { clearCart } = useCart();
  const { reset } = useCheckoutStore();

  const handleSubmit = async () => {
    if (!selectedPayment) {
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

    router.push('/');
  };

  return (
    <div className="space-y-6">

      {/* Payment Method Selection */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">
          Escolha o método de pagamento:
        </h3>

        <PaymentGatewaySelector
          value={selectedPayment}
          onChange={setSelectedPayment}
        />
      </div>

      {/* Finalize Button */}
      <div className="pt-4">
        <button
          onClick={handleSubmit}
          disabled={!selectedPayment || isProcessing}
          className="w-full h-14 rounded-full bg-[#00C9FF] hover:bg-[#00B8EE] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {isProcessing ? 'Processando...' : 'Finalizar'}
        </button>
      </div>
    </div>
  );
}
