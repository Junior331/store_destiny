'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { customToast } from '@/components/CustomToast';
import { CouponInput } from '@/components/molecules/CouponInput';
import { PaymentGatewaySelector } from '@/components/molecules/PaymentGatewaySelector';
import { PaymentGateway } from '@/components/atoms/PaymentGatewayButton';
import { QRPaymentModal } from '@/components/molecules/QRPaymentModal/QRPaymentModal';
import { useCart } from '@/lib/hooks/useCart';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useLoading } from '@/contexts/LoadingContext';

export interface CheckoutFormProps {
  serverId: string;
}

export function CheckoutForm({ serverId }: CheckoutFormProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentGateway>();
  const [showPixModal, setShowPixModal] = useState(false);
  const { clearCart, items } = useCart();
  const { reset } = useCheckoutStore();
  const { addLoading, removeLoading } = useLoading();

  const totalAmount = items.reduce((acc, item) => {
    const price = item.product.discountedPrice || item.product.originalPrice;
    return acc + (price * item.quantity);
  }, 0);

  // Mapeamento de URLs de redirecionamento para cada gateway
  const paymentGatewayUrls: Record<PaymentGateway, string> = {
    getnet: '/api/payment/getnet', // Aguardando URL da API
    stripe: '/api/payment/stripe', // Aguardando URL da API
    paypal: '/api/payment/paypal', // Aguardando URL da API
    picpay: '/api/payment/picpay', // Aguardando URL da API
    pix: '', // PIX usa modal
    mercadopago: '/api/payment/mercadopago', // Aguardando URL da API
    coinbase: '/api/payment/coinbase', // Aguardando URL da API
  };

  const handleSubmit = async () => {
    if (items.length === 0) {
      customToast.warning('Adicione um produto ao carrinho para continuar.');
      return;
    }

    if (!selectedPayment) {
      customToast.error('Selecione um método de pagamento');
      return;
    }

    // Se for PIX, abre o modal
    if (selectedPayment === 'pix') {
      setShowPixModal(true);
      return;
    }

    setIsProcessing(true);
    const loadingId = addLoading();

    // Redireciona para o serviço do gateway
    const redirectUrl = paymentGatewayUrls[selectedPayment];

    // Aqui você pode fazer uma chamada à API para criar a sessão de pagamento
    // e receber a URL de redirecionamento do gateway
    customToast.info('Redirecionando para o pagamento...');

    // Simulação de redirecionamento (substituir pela URL real da API)
    setTimeout(() => {
      // window.location.href = redirectUrl; // Descomentar quando tiver as URLs reais
      customToast.success('Pagamento processado com sucesso!');
      clearCart();
      reset();
      setIsProcessing(false);
      removeLoading(loadingId);
      router.push('/loja');
    }, 2000);
  };

  const handlePixPaymentComplete = () => {
    const loadingId = addLoading();
    setShowPixModal(false);
    customToast.success('Pagamento processado com sucesso!');
    clearCart();
    reset();
    setTimeout(() => {
      removeLoading(loadingId);
      router.push('/loja');
    }, 500);
  };

  return (
    <>
      <div className="space-y-6">

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Escolha o método de pagamento:
          </h3>

          <PaymentGatewaySelector
            value={selectedPayment}
            onChange={setSelectedPayment}
            onFinalize={handleSubmit}
          />
        </div>
      </div>

      <QRPaymentModal
        isOpen={showPixModal}
        onClose={() => setShowPixModal(false)}
        amount={totalAmount}
      />
    </>
  );
}
