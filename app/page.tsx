import Hero from '@/components/Hero';
import AboutSection from '@/components/sections/AboutSection';
import ExperiencesSection from '@/components/sections/ExperiencesSection';
import ImpactSection from '@/components/sections/ImpactSection';
import pool from '@/lib/db';

async function getExperiences() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM experiences ORDER BY id ASC LIMIT 3');
        return result.rows;
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return [];
    } finally {
        client.release();
    }
}

export default async function Home() {
    const experiences = await getExperiences();

    return (
        <div className="flex flex-col gap-0">
            <Hero />
            <AboutSection />
            <ExperiencesSection experiences={experiences} />
            <ImpactSection />
        </div>
    );
}
