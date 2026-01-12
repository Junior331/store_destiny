import { useCheckoutStore } from '@/store/checkoutStore';
import { PaymentGateway } from '@/lib/types';

// Gateways de pagamento disponíveis
export const PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    id: 'getnet',
    name: 'Getnet',
    icon: '💳',
    fee: 2.5,
    active: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: '💳',
    fee: 3.0,
    active: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    fee: 3.5,
    active: true,
  },
  {
    id: 'picpay',
    name: 'PicPay',
    icon: '📱',
    fee: 1.5,
    active: true,
  },
  {
    id: 'pix',
    name: 'PIX',
    icon: '🔷',
    fee: 0,
    active: true,
  },
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    icon: '🛒',
    fee: 2.99,
    active: true,
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    icon: '₿',
    fee: 1.0,
    active: true,
  },
  {
    id: 'foxbit',
    name: 'Foxbit',
    icon: '🦊',
    fee: 0.5,
    active: true,
  },
];

export function usePaymentGateway() {
  const { selectedGateway, setGateway } = useCheckoutStore();

  const availableGateways = PAYMENT_GATEWAYS.filter((g) => g.active);

  const selectGateway = (gatewayId: string) => {
    const gateway = PAYMENT_GATEWAYS.find((g) => g.id === gatewayId);
    if (gateway) {
      setGateway(gateway);
    }
  };

  return {
    selectedGateway,
    availableGateways,
    selectGateway,
  };
}
