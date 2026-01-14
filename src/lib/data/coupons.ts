import { Coupon } from '@/lib/types/payment';

/**
 * Cupons de desconto disponíveis
 * Em produção, isso deveria vir de um backend/API
 */
export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'DESTINY10',
    discountPercent: 10,
    active: true,
  },
  {
    code: 'DESTINY15',
    discountPercent: 15,
    active: true,
  },
  {
    code: 'DESTINY20',
    discountPercent: 20,
    active: true,
  },
  {
    code: 'PRIMEIRACOMPRA',
    discountPercent: 25,
    active: true,
  },
  {
    code: 'BLACKFRIDAY',
    discountPercent: 30,
    active: true,
  },
  {
    code: 'VIP50',
    discountPercent: 50,
    active: true,
  },
  {
    code: 'TESTE5',
    discountPercent: 5,
    active: true,
  },
];

/**
 * Valida um cupom de desconto
 */
export function validateCoupon(code: string): Coupon | null {
  const coupon = AVAILABLE_COUPONS.find(
    (c) => c.code.toUpperCase() === code.toUpperCase() && c.active
  );
  return coupon || null;
}

/**
 * Calcula o valor do desconto baseado no cupom
 */
export function calculateCouponDiscount(
  subtotal: number,
  coupon: Coupon | null
): number {
  if (!coupon) return 0;

  if (coupon.discountAmount) {
    // Desconto fixo em reais
    return Math.min(coupon.discountAmount, subtotal);
  }

  // Desconto percentual
  return (subtotal * coupon.discountPercent) / 100;
}
