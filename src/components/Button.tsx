import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

// Define our variants using CVA
const buttonVariants = cva(
  "relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-xl transition-all duration-300 ease-out active:scale-[0.98] overflow-hidden",
  {
    variants: {
      tintShadow: {
        true: "shadow-tint-default hover:shadow-tint-hover",
        false: "shadow-neutral-default hover:shadow-neutral-hover",
      },
      // We extract the color logic into a specific variant
      status: {
        default: "bg-purple-700 text-purple-50",
        disabled:
          "bg-purple-400 text-purple-600 cursor-not-allowed shadow-none hover:shadow-none active:scale-100",
      },
    },
    defaultVariants: {
      tintShadow: false,
      status: "default",
    },
  },
);

// Define Props
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  progress?: number;
}

// using forwardRef for DX
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      tintShadow,
      asChild = false,
      isLoading = false,
      progress = 80,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isEffectivelyDisabled = disabled || isLoading;
    const currentStatus = isEffectivelyDisabled ? "disabled" : "default";

    const loadingStyle = isLoading
      ? {
          background: `linear-gradient(to right, var(--color-purple-700) ${progress}%, var(--color-purple-400) ${progress}%)`,
          transition: "background 0.4s ease-in-out",
        }
      : {};

    return (
      <Comp
        className={cn(
          buttonVariants({ tintShadow, status: currentStatus, className }),
        )}
        ref={ref}
        disabled={isEffectivelyDisabled}
        style={loadingStyle}
        {...props}
      >
        {isLoading ? (
          <span className="animate-pulse duration-700">
            Loading... {progress}%
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
