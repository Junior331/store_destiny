'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { CheckoutForm } from '@/components/organisms/CheckoutForm';
import { PaymentSummary } from '@/components/molecules/PaymentSummary';
import { ProductCard } from '@/components/molecules/ProductCard';
import { useCart } from '@/lib/hooks/useCart';
import { calculateCheckoutTotals } from '@/lib/utils/calculations';
import { useCheckoutStore } from '@/store/checkoutStore';

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
  const { appliedCoupon, selectedGateway } = useCheckoutStore();

  const { subtotal, discount, gatewayFee, total } = calculateCheckoutTotals(
    items,
    appliedCoupon,
    selectedGateway?.fee || 0
  );

  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items.length, router]);

  const handleBackToStore = () => {
    router.push('/');
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button
          onClick={handleBackToStore}
          variant="ghost"
          className="mb-6 text-white hover:text-white/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="flex flex-col gap-8">
          {/* Left Side - Order Summary */}
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">
              Finalize seu pedido!
            </h1>
            <p className="text-gray-400 text-sm mb-6">
              Seu pedido será entregue após a confirmação do pagamento.
              <br />
              <button className="text-[#377DFF] italic hover:underline">
                Clique aqui
              </button>{' '}
              para entender o prazo de recebimento
            </p>

            {/* Order Details */}
            <div className="space-y-6 items-center md:space-y-0 md:grid md:grid-cols-[minmax(auto,360px)_auto_1fr] md:gap-5">
              {/* PaymentSummary - largura fixa */}
              <PaymentSummary
                cashValue={items.reduce((acc, item) => {
                  const price = item.product.discountedPrice || item.product.originalPrice;
                  return acc + (price * item.quantity);
                }, 0)}
                paymentFee={gatewayFee}
                onApplyCoupon={(coupon) => {
                  const validCoupons: Record<string, number> = {
                    'DESCONTO10': 50,
                    'PROMO20': 100,
                    'VIP': 150,
                  };
                  const discount = validCoupons[coupon];
                  return { valid: !!discount, discount: discount || 0 };
                }}
                onTotalChange={(total) => console.log('Total:', total)}
              />

              {/* Divisor vertical - aparece apenas no desktop */}
                <div
                  className="w-[1px] h-[156px]"
                  style={{
                    background: 'rgba(243, 243, 243, 0.10)',
                  }}
                />

              {/* Cart Items */}
              <div className="flex items-center gap-4 pt-6 md:pt-0">
                {items.map((item) => (
                  <div key={item.product.id} className="w-56">
                    <ProductCard
                      product={item.product}
                      checkoutMode={true}
                      quantity={item.quantity}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div>
            <CheckoutForm serverId={serverId} />
          </div>
        </div>
      </div>
    </div>
  );
}
