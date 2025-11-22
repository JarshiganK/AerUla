import Section from '@/components/Section';
import ExperienceCard from '@/components/ExperienceCard';
import pool from '@/lib/db';
import { Container } from '@/components/ui/Container';

async function getAllExperiences() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM experiences ORDER BY id ASC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return [];
    } finally {
        client.release();
    }
}

export default async function ExperiencesPage() {
    const experiences = await getAllExperiences();

    return (
        <div className="pt-24 min-h-screen bg-gradient-to-b from-Blue-50 to-white">
            <div className="bg-Blue-50 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-Blue-100/60 rounded-full blur-3xl" />
                </div>

                <Container className="text-center relative z-10">
                    <span className="text-Blue-500 font-bold tracking-wider uppercase text-sm mb-3 block">Discover</span>
                    <h1 className="text-5xl md:text-6xl font-bold text-Blue-700 mb-6 tracking-tight">
                        Curated Moments at
                    </h1>
                    <p className="text-xl text-Blue-700/60 max-w-2xl mx-auto leading-relaxed">
                        Immerse yourself in the authentic rhythm of our village. Each experience is hosted by local artisans and families.
                    </p>
                </Container>
            </div>

            <Section className="bg-transparent -mt-12 relative z-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {experiences.map((experience) => (
                        <ExperienceCard key={experience.id} experience={experience} />
                    ))}
                </div>
            </Section>
        </div>
    );
}
