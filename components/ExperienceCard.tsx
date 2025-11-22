import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface Experience {
    id: number;
    slug: string;
    title: string;
    short_description: string;
    duration_label: string;
    price_label: string;
    difficulty: string;
}

interface ExperienceCardProps extends React.HTMLAttributes<HTMLElement> {
    experience: Experience;
}

export default function ExperienceCard({ experience, className, ...props }: ExperienceCardProps) {
    return (
        <article
            className={cn(
                "group h-full flex flex-col bg-white rounded-3xl border border-aerulaBlue-50 shadow-float hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden",
                className
            )}
            {...props}
        >
            <div className="p-8 flex flex-col h-full">
                <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary">{experience.duration_label}</Badge>
                    <Badge variant="secondary">{experience.price_label}</Badge>
                    <Badge variant="outline" className="bg-white text-aerulaBlue-500">{experience.difficulty}</Badge>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-aerulaBlue-500 transition-colors">
                    {experience.title}
                </h3>

                <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                    {experience.short_description}
                </p>

                <Link
                    href="/contact"
                    className="inline-flex items-center text-aerulaBlue-600 font-bold hover:text-aerulaBlue-500 transition-colors mt-auto group/link"
                >
                    I want this experience
                    <span className="ml-2 transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
            </div>
            <div className="h-1.5 w-full bg-gradient-to-r from-aerulaBlue-500 to-aerulaBlue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </article>
    );
}
