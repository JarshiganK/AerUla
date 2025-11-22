import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Note: I'm not installing cva/radix-slot to keep it simple as per "no extra deps" unless needed, 
// but the user asked for "world class". 
// Actually, let's stick to simple props for now to avoid too many deps if I can't run npm install reliably for everything.
// Wait, I can run npm install. But let's write a clean component without CVA if I don't want to install it, 
// OR I can just install it. The user asked for "refine and clean".
// I'll write a clean component without CVA for now to minimize dependency bloat, 
// or just use standard props.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "pill";
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aerulaBlue-400 disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            primary: "bg-aerulaBlue-500 text-white shadow-float hover:bg-aerulaBlue-700 hover:shadow-lg hover:-translate-y-0.5",
            secondary: "bg-aerulaBlue-50 text-aerulaBlue-700 hover:bg-aerulaBlue-100",
            outline: "border border-aerulaBlue-100 bg-transparent hover:bg-aerulaBlue-50 text-aerulaBlue-700",
            ghost: "hover:bg-aerulaBlue-50 text-aerulaBlue-700/80 hover:text-aerulaBlue-500",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-8 text-lg",
            pill: "px-6 py-2.5",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
