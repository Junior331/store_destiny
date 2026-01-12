import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type PaymentGateway =
  | "getnet"
  | "stripe"
  | "paypal"
  | "picpay"
  | "pix"
  | "mercadopago"
  | "foxbit";

interface PaymentGatewayButtonProps {
  gateway: PaymentGateway;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const gatewayConfig: Record<PaymentGateway, {
  label: string;
  activeColor: string;
  textColor?: string;
}> = {
  getnet: {
    label: "Getnet",
    activeColor: "bg-[#E91E63]",
  },
  stripe: {
    label: "stripe",
    activeColor: "bg-[#635BFF]",
  },
  paypal: {
    label: "PayPal",
    activeColor: "bg-[#003087]",
  },
  picpay: {
    label: "PicPay",
    activeColor: "bg-[#21C25E]",
  },
  pix: {
    label: "Pix",
    activeColor: "bg-[#32BCAD]",
  },
  mercadopago: {
    label: "mercado pago",
    activeColor: "bg-[#00B1EA]",
  },
  foxbit: {
    label: "foxbit",
    activeColor: "bg-[#F7931A]",
  },
};

const PaymentGatewayButton = React.forwardRef<HTMLButtonElement, PaymentGatewayButtonProps>(
  ({ gateway, selected = false, onClick, className }, ref) => {
    const config = gatewayConfig[gateway];

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center gap-2 px-4 py-3 min-w-[100px] h-[44px]",
          "rounded-lg border transition-all duration-300 ease-out",
          "font-semibold text-sm",
          // Default/inactive state
          "bg-[#1A1F2E] border-[#2D3348] text-gray-500",
          // Hover state - show colored version
          "hover:border-transparent hover:text-white",
          gateway === "getnet" && "hover:bg-[#E91E63]",
          gateway === "stripe" && "hover:bg-[#635BFF]",
          gateway === "paypal" && "hover:bg-[#003087]",
          gateway === "picpay" && "hover:bg-[#21C25E]",
          gateway === "pix" && "hover:bg-[#32BCAD]",
          gateway === "mercadopago" && "hover:bg-[#00B1EA]",
          gateway === "foxbit" && "hover:bg-[#F7931A]",
          // Selected state - always show colored version
          selected && config.activeColor,
          selected && "border-transparent text-white",
          className
        )}
      >
        {/* Pix icon */}
        {gateway === "pix" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
            <path d="M17.253 5.753l-5.247 5.247-5.253-5.247-1.753 1.753 5.253 5.247-5.253 5.247 1.753 1.753 5.253-5.247 5.247 5.247 1.753-1.753-5.247-5.247 5.247-5.247z"/>
          </svg>
        )}

        {/* Mercado Pago stacked text */}
        {gateway === "mercadopago" ? (
          <span className="flex flex-col items-center leading-tight text-xs">
            <span>mercado</span>
            <span className="font-bold">pago</span>
          </span>
        ) : (
          <span>{config.label}</span>
        )}
      </button>
    );
  }
);

PaymentGatewayButton.displayName = "PaymentGatewayButton";

export { PaymentGatewayButton };
