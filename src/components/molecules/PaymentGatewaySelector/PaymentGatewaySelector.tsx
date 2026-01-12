import * as React from "react";
import { PaymentGatewayButton, PaymentGateway } from "@/components/atoms/PaymentGatewayButton";
import { cn } from "@/lib/utils/cn";

interface PaymentGatewaySelectorProps {
  value?: PaymentGateway;
  onChange?: (gateway: PaymentGateway) => void;
  onFinalize?: () => void;
  className?: string;
}

const gateways: PaymentGateway[] = [
  "getnet",
  "stripe",
  "paypal",
  "picpay",
  "pix",
  "mercadopago",
  "coinbase",
];

const PaymentGatewaySelector: React.FC<PaymentGatewaySelectorProps> = ({
  value,
  onChange,
  onFinalize,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {gateways.map((gateway) => {
        const isSelected = value === gateway;

        return isSelected ? (
          <div className="flex flex-col items-center justify-center bg-[#2A6C80] p-2 rounded-xl gap-2.5" key={gateway}>
            <PaymentGatewayButton
              gateway={gateway}
              selected={true}
              onClick={() => onChange?.(gateway)}
            />
            <button
              onClick={onFinalize}
              className="text-[#F3F3F3] text-lg font-medium leading-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              Finalizar
            </button>
          </div>
        ) : (
          <PaymentGatewayButton
            key={gateway}
            gateway={gateway}
            selected={false}
            onClick={() => onChange?.(gateway)}
          />
        );
      })}
    </div>
  );
};

export { PaymentGatewaySelector };
