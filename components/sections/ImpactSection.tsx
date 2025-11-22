import Section from '@/components/Section';
import ImpactCard from '@/components/ImpactCard';
import { Leaf, Footprints, HeartHandshake } from 'lucide-react';

export default function ImpactSection() {
    return (
        <Section id="impact" className="bg-white">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="text-aerulaBlue-500 font-bold tracking-wider uppercase text-sm mb-3 block">Our Impact</span>
                <h2 className="text-4xl md:text-5xl font-bold text-aerulaBlue-700 mb-6 tracking-tight">
                    Community First
                </h2>
                <p className="text-xl text-slate-700">
                    Every visit contributes directly to the well-being of our village.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <ImpactCard
                    title="Local Livelihoods"
                    description="80% of revenue goes directly to the hosting families and artisans."
                    icon={<HeartHandshake className="w-8 h-8" />}
                />
                <ImpactCard
                    title="Low-footprint Design"
                    description="Structures built with reclaimed materials and traditional earth techniques."
                    icon={<Leaf className="w-8 h-8" />}
                />
                <ImpactCard
                    title="Cultural Continuity"
                    description="Preserving oral histories, songs, and crafts for the next generation."
                    icon={<Footprints className="w-8 h-8" />}
                />
            </div>
        </Section>
    );
}
