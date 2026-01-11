'use client';

import { Typography } from '@/components/atoms/Typography';
import { PaymentOption } from '@/components/molecules/PaymentOption';
import { usePaymentGateway } from '@/lib/hooks/usePaymentGateway';

export function PaymentGatewaySelector() {
  const { selectedGateway, availableGateways, selectGateway } =
    usePaymentGateway();

  return (
    <div className="space-y-4">
      <Typography variant="h3">Método de Pagamento</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {availableGateways.map((gateway) => (
          <PaymentOption
            key={gateway.id}
            gateway={gateway}
            selected={selectedGateway?.id === gateway.id}
            onSelect={() => selectGateway(gateway.id)}
          />
        ))}
      </div>
    </div>
  );
}
