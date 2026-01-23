import * as React from "react";
import {
  PaymentGatewayButton,
  PaymentGateway,
} from "@/components/atoms/PaymentGatewayButton";
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
  const handleGatewayClick = (gateway: PaymentGateway) => {
    // Se já está selecionado, segundo click finaliza
    if (value === gateway) {
      onFinalize?.();
      return;
    }
    // Primeiro click: seleciona
    onChange?.(gateway);
  };

  return (
    <div
      className={cn(
        "flex flex-wrap gap-3 justify-center md:justify-start",
        className
      )}
    >
      {gateways.map((gateway) => {
        const isSelected = value === gateway;

        return isSelected ? (
          <div
            className="shiny-button relative flex flex-col items-center justify-center transition-all duration-300 bg-[#2A6C80] p-2 rounded-xl gap-2.5"
            key={gateway}
          >
            <PaymentGatewayButton
              gateway={gateway}
              selected={true}
              onClick={() => handleGatewayClick(gateway)}
            />
            <button
              onClick={() => handleGatewayClick(gateway)}
              className="text-[#F3F3F3] text-lg font-medium leading-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              Finalizar
            </button>
            <span className="shiny-effect absolute inset-0 rounded-full pointer-events-none" />
          </div>
        ) : (
          <PaymentGatewayButton
            key={gateway}
            gateway={gateway}
            selected={false}
            onClick={() => handleGatewayClick(gateway)}
          />
        );
      })}
    </div>
  );
};

export { PaymentGatewaySelector };
