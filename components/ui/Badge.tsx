import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "outline" | "secondary";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variants = {
        default: "border-transparent bg-Blue-500 text-white shadow hover:bg-Blue-600",
        secondary: "border-Blue-100 bg-Blue-50 text-Blue-700",
        outline: "text-Blue-700 border-Blue-100",
    };

    return (
        <div className={cn(baseStyles, variants[variant], className)} {...props} />
    );
}

export { Badge };
