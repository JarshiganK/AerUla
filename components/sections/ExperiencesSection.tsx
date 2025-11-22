import Section from '@/components/Section';
import ExperienceCard from '@/components/ExperienceCard';

interface Experience {
    id: number;
    slug: string;
    title: string;
    short_description: string;
    duration_label: string;
    price_label: string;
    difficulty: string;
}

interface ExperiencesSectionProps {
    experiences: Experience[];
}

export default function ExperiencesSection({ experiences }: ExperiencesSectionProps) {
    return (
        <Section id="experiences" className="bg-Blue-50/30">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="text-Blue-500 font-bold tracking-wider uppercase text-sm mb-3 block">Curated Moments</span>
                <h2 className="text-4xl md:text-5xl font-bold text-Blue-700 mb-6 tracking-tight">
                    Experiences that Linger
                </h2>
                <p className="text-xl text-Blue-700/60">
                    Hand-picked activities designed to immerse you in the local way of life.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experiences.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                ))}
            </div>
        </Section>
    );
}
