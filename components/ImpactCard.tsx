import { cn } from "@/lib/utils";

interface ImpactCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export default function ImpactCard({ title, description, icon, className, ...props }: ImpactCardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-3xl p-8 shadow-float hover:-translate-y-1 transition-transform duration-300 border border-Blue-100/50 h-full",
                className
            )}
            {...props}
        >
            <div className="mb-6 text-Blue-500 bg-Blue-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-Blue-700 mb-3">{title}</h3>
            <p className="text-Blue-700/70 text-base leading-relaxed">{description}</p>
        </div>
    );
}
