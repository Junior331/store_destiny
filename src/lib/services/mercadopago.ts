export interface MercadoPagoCheckoutParams {
  items: Array<{
    id: string;
    title: string;
    quantity: number;
    unit_price: number;
  }>;
  payer?: {
    email?: string;
  };
  back_urls?: {
    success?: string;
    failure?: string;
    pending?: string;
  };
  auto_return?: 'approved' | 'all';
  payment_methods?: {
    excluded_payment_types?: Array<{ id: string }>;
    installments?: number;
  };
}

export interface MercadoPagoResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

/**
 * Cria um checkout do Mercado Pago
 * Em produção, isso deve ser feito no backend por segurança
 */
export async function createMercadoPagoCheckout(
  params: MercadoPagoCheckoutParams
): Promise<MercadoPagoResponse> {
  // TODO: Implementar chamada real à API do Mercado Pago
  // Esta é uma simulação - em produção, fazer via backend

  // Simula uma resposta do Mercado Pago
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'fake-preference-id-' + Date.now(),
        init_point: `https://www.mercadopago.com.br/checkout/v1/payment/redirect/?preference-id=fake-${Date.now()}`,
        sandbox_init_point: `https://sandbox.mercadopago.com.br/checkout/v1/payment/redirect/?preference-id=fake-${Date.now()}`,
      });
    }, 1000);
  });
}

/**
 * Redireciona para o checkout do Mercado Pago
 */
export function redirectToMercadoPago(checkoutUrl: string) {
  window.location.href = checkoutUrl;
}
