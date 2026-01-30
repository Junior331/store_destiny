import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { getIcons } from "@/assets/icons";

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  cartCount?: number;
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ className, children, cartCount = 0, ...props }, ref) => {
    return (
      <div className="sticky mt-6 -mb-1 bottom-0 left-0 right-0 flex justify-center z-50 py-2 w-full">
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="pulse-ring" />
        </span>

        <button
          ref={ref}
          className={cn(
            "shiny-button relative flex w-[218px] h-[55px] items-center justify-center gap-3",
            "rounded-full border border-[#3A94AE] bg-[#2A6C80]",
            "text-white font-medium text-lg",
            "overflow-hidden transition-all duration-300",
            "hover:brightness-110 active:scale-[0.98]",
            className
          )}
          {...props}
        >
          <span className="shiny-effect absolute inset-0 rounded-full pointer-events-none" />
          <span className="relative z-10">{children}</span>
        </button>
        {cartCount > 0 && (
          <div className="cart-checkout">
            <Image
              src={getIcons("cart_checkout")}
              alt="Cart"
              width={16}
              height={16}
            />
            <span className="checkout-cart-quantity">{cartCount}</span>
          </div>
        )}
      </div>
    );
  }
);

ShinyButton.displayName = "ShinyButton";

export { ShinyButton };
