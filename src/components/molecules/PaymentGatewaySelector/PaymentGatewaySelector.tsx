import * as React from "react";
import { PaymentGatewayButton, PaymentGateway } from "@/components/atoms/PaymentGatewayButton";
import { cn } from "@/lib/utils/cn";

interface PaymentGatewaySelectorProps {
  value?: PaymentGateway;
  onChange?: (gateway: PaymentGateway) => void;
  className?: string;
}

const gateways: PaymentGateway[] = [
  "getnet",
  "stripe",
  "paypal",
  "picpay",
  "pix",
  "mercadopago",
  "foxbit",
];

const PaymentGatewaySelector: React.FC<PaymentGatewaySelectorProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {gateways.map((gateway) => (
        <PaymentGatewayButton
          key={gateway}
          gateway={gateway}
          selected={value === gateway}
          onClick={() => onChange?.(gateway)}
        />
      ))}
    </div>
  );
};

export { PaymentGatewaySelector };
