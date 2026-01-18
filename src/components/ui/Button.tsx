"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[var(--blue-500)] text-white hover:bg-[var(--blue-600)] active:bg-[var(--blue-700)]":
              variant === "primary",
            "bg-[var(--gray-100)] text-[var(--gray-700)] hover:bg-[var(--gray-200)] active:bg-[var(--gray-300)]":
              variant === "secondary",
            "bg-transparent text-[var(--gray-600)] hover:bg-[var(--gray-100)] active:bg-[var(--gray-200)]":
              variant === "ghost",
          },
          {
            "h-8 px-3 text-sm rounded-lg": size === "sm",
            "h-10 px-4 text-sm rounded-lg": size === "md",
            "h-12 px-6 text-base rounded-xl": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
