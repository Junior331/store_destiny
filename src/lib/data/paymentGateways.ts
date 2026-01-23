import { PaymentGateway as PaymentGatewayType } from '@/lib/types/payment';

/**
 * Configuração de taxas por gateway de pagamento
 * As taxas são calculadas como porcentagem sobre o valor total
 */
export const PAYMENT_GATEWAYS_CONFIG: Record<string, { fee: number; name: string }> = {
  getnet: {
    name: 'Getnet',
    fee: 3.99, // 3.99% de taxa
  },
  stripe: {
    name: 'Stripe',
    fee: 4.99, // 4.99% de taxa
  },
  paypal: {
    name: 'PayPal',
    fee: 5.49, // 5.49% de taxa
  },
  picpay: {
    name: 'PicPay',
    fee: 3.49, // 3.49% de taxa
  },
  pix: {
    name: 'PIX',
    fee: 0, // Sem taxa
  },
  mercadopago: {
    name: 'Mercado Pago',
    fee: 4.99, // 4.99% de taxa
  },
  coinbase: {
    name: 'Coinbase',
    fee: 2.99, // 2.99% de taxa (criptomoedas geralmente têm taxas menores)
  },
};

/**
 * Retorna a taxa do gateway selecionado
 * @param gatewayId - ID do gateway
 * @returns Taxa em porcentagem
 */
export function getGatewayFee(gatewayId: string): number {
  return PAYMENT_GATEWAYS_CONFIG[gatewayId]?.fee || 0;
}

/**
 * Calcula o valor da taxa baseado no subtotal
 * @param subtotal - Valor subtotal
 * @param gatewayId - ID do gateway
 * @returns Valor da taxa em reais
 */
export function calculateGatewayFee(subtotal: number, gatewayId: string): number {
  const feePercent = getGatewayFee(gatewayId);
  return (subtotal * feePercent) / 100;
}
