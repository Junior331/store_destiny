import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="pulse-ring" />
        </span>

        <button
          ref={ref}
          className={cn(
            "shiny-button relative flex w-[318px] h-[54px] items-center justify-center",
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
      </div>
    );
  }
);

ShinyButton.displayName = "ShinyButton";

export { ShinyButton };
