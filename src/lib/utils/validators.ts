/**
 * Valida se uma quantidade está dentro do limite permitido
 */
export function isValidQuantity(quantity: number): boolean {
  return quantity >= 1 && quantity <= 15;
}

/**
 * Valida se um código de cupom tem formato válido
 */
export function isValidCouponCode(code: string): boolean {
  return code.length >= 3 && code.length <= 20;
}

/**
 * Valida se um email tem formato válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
