'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { CheckoutForm } from '@/components/organisms/CheckoutForm';
import { PaymentSummary } from '@/components/molecules/PaymentSummary';
import { ProductCarousel } from '@/components/molecules/ProductCarousel';
import { useCart } from '@/lib/hooks/useCart';
import { calculateCheckoutTotals } from '@/lib/utils/calculations';
import { useCheckoutStore } from '@/store/checkoutStore';
import { cn } from '@/lib/utils/cn';

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
    router.push('/loja');
  };

  if (items.length === 0) {
    return null;
  }

  return (
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
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">
            Finalize seu pedido!
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Seu pedido será entregue após a confirmação do pagamento.
            <br />
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#377DFF] italic hover:underline">
              Clique aqui
            </a>{' '}
            para entender o prazo de recebimento
          </p>

          <div className="space-y-6 items-center xl:space-y-0 xl:grid xl:grid-cols-[minmax(auto,360px)_auto_1fr] md:gap-5">
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

            <div
              className={cn("w-[156px] mx-auto h-[1px] xl:w-[1px] xl:h-[156px] bg-[#f3f3f319]", items.length <= 1 && "mb-0")} 
              />

            <div className={cn("xl:pt-0 mx-auto xl:mx-0", items.length > 1 && "pt-12")}>
              <ProductCarousel items={items} />
            </div>
          </div>
        </div>

        <div>
          <CheckoutForm serverId={serverId} />
        </div>
      </div>
    </div>
  );
}
