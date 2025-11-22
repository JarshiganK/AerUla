import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    containerClassName?: string;
}

export default function Section({ id, className, containerClassName, children, ...props }: SectionProps) {
    return (
        <section
            id={id}
            className={cn("py-16 sm:py-20 relative", className)}
            {...props}
        >
            <Container className={containerClassName}>
                {children}
            </Container>
        </section>
    );
}
