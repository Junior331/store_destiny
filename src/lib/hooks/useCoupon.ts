import { useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { Coupon } from '@/lib/types';

// Mock de cupons disponíveis
const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'DESCONTO10',
    discountPercent: 10,
    active: true,
  },
  {
    code: 'DESCONTO20',
    discountPercent: 20,
    active: true,
  },
  {
    code: 'PROMO50',
    discountAmount: 50,
    discountPercent: 0,
    active: true,
  },
];

export function useCoupon() {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { appliedCoupon, applyCoupon, removeCoupon } = useCheckoutStore();

  const validateCoupon = async (code: string): Promise<boolean> => {
    setIsValidating(true);
    setError(null);

    // Simula validação com delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const coupon = AVAILABLE_COUPONS.find(
      (c) => c.code.toLowerCase() === code.toLowerCase() && c.active
    );

    if (coupon) {
      applyCoupon(coupon);
      setIsValidating(false);
      return true;
    }

    setError('Cupom inválido ou expirado');
    setIsValidating(false);
    return false;
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setError(null);
  };

  return {
    appliedCoupon,
    isValidating,
    error,
    validateCoupon,
    removeCoupon: handleRemoveCoupon,
  };
}
