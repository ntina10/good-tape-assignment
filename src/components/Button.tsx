import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  "relative inline-flex w-fit shrink-0 items-center justify-center px-3 py-2 rounded-full font-sharp-medium text-label whitespace-nowrap transition-all duration-300 ease-out active:scale-[0.98] overflow-hidden",
  {
    variants: {
      shadow: {
        tint: "shadow-tint-default",
        neutral: "shadow-neutral-default",
      },
      status: {
        default: "bg-purple-700 text-purple-50",
        loading: "text-purple-50 active:scale-100",
        disabled:
          "bg-purple-400 text-purple-600 cursor-not-allowed shadow-none hover:shadow-none active:scale-100",
      },
    },
    compoundVariants: [
      {
        shadow: "tint",
        status: "default",
        className: "hover:shadow-tint-hover",
      },
      {
        shadow: "neutral",
        status: "default",
        className: "hover:shadow-neutral-hover",
      },
    ],
    defaultVariants: {
      shadow: "neutral",
      status: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  progress?: number;
}

// using forwardRef for DX
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      shadow,
      asChild = false,
      loading = false,
      progress = 80,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isEffectivelyDisabled = disabled || loading;
    const currentStatus = disabled
      ? "disabled"
      : loading
        ? "loading"
        : "default";

    const loadingStyle = loading
      ? {
          background: `linear-gradient(to right, var(--color-purple-700) ${progress}%, var(--color-purple-400) ${progress}%)`,
          transition: "background 0.4s ease-in-out",
        }
      : {};

    return (
      <Comp
        className={cn(
          buttonVariants({ shadow, status: currentStatus, className }),
        )}
        ref={ref}
        disabled={isEffectivelyDisabled}
        style={loadingStyle}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-1 whitespace-nowrap animate-pulse duration-700">
            <span>Loading...</span>
            <span className="inline-grid min-w-[3ch] text-right font-mono-brand tabular-nums">
              <span className="invisible col-start-1 row-start-1">99%</span>
              <span className="col-start-1 row-start-1 text-right">
                {progress}%
              </span>
            </span>
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

// Always set displayName when using forwardRef
Button.displayName = "Button";
