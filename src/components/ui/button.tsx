import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-text text-small font-medium transition-colors duration-standard ease-standard focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-accent text-ink-inverse hover:bg-accent-hover active:bg-accent-hover",
        destructive: "bg-error text-ink-inverse hover:opacity-90",
        outline:
          "border border-ink bg-transparent text-ink hover:bg-ink hover:text-ink-inverse",
        secondary: "bg-surface-alt text-ink hover:bg-border",
        ghost: "bg-transparent text-ink underline-offset-4 hover:underline",
        link: "bg-transparent text-accent underline-offset-4 hover:underline hover:text-accent-hover",
        primary: "bg-accent text-ink-inverse hover:bg-accent-hover active:bg-accent-hover",
        cta: "bg-accent text-ink-inverse hover:bg-accent-hover",
        subtle: "bg-transparent text-ink border-b border-ink/30 rounded-none hover:border-ink px-0 pb-1",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-caption",
        lg: "h-12 px-8 py-3",
        xl: "h-14 px-10 py-4 text-body",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
