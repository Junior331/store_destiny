import { CartItem, Coupon } from '@/lib/types';

/**
 * Calcula o subtotal do carrinho
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const price = item.product.discountedPrice || item.product.originalPrice;
    return total + price * item.quantity;
  }, 0);
}

/**
 * Calcula o desconto do cupom
 */
export function calculateCouponDiscount(
  subtotal: number,
  coupon: Coupon | null
): number {
  if (!coupon || !coupon.active) return 0;

  if (coupon.discountAmount) {
    return Math.min(coupon.discountAmount, subtotal);
  }

  return subtotal * (coupon.discountPercent / 100);
}

/**
 * Calcula a taxa do gateway de pagamento
 */
export function calculateGatewayFee(
  amount: number,
  feePercent: number
): number {
  return amount * (feePercent / 100);
}

/**
 * Calcula o total final
 */
export function calculateTotal(
  subtotal: number,
  discount: number,
  gatewayFee: number
): number {
  return Math.max(0, subtotal - discount + gatewayFee);
}

/**
 * Calcula todos os valores do checkout
 */
export function calculateCheckoutTotals(
  items: CartItem[],
  coupon: Coupon | null,
  gatewayFeePercent: number
) {
  const subtotal = calculateSubtotal(items);
  const discount = calculateCouponDiscount(subtotal, coupon);
  const amountAfterDiscount = subtotal - discount;
  const gatewayFee = calculateGatewayFee(amountAfterDiscount, gatewayFeePercent);
  const total = calculateTotal(subtotal, discount, gatewayFee);

  return {
    subtotal,
    discount,
    gatewayFee,
    total,
  };
}
