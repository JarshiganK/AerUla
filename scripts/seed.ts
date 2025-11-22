import { promises as fs } from 'fs';
import path from 'path';
import { Pool } from 'pg';

async function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env');
        const envFile = await fs.readFile(envPath, 'utf8');
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
    } catch (error) {
        console.warn('Could not read .env file, assuming environment variables are set.');
    }
}

async function seed() {
    await loadEnv();

    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL is not set');
        process.exit(1);
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    const client = await pool.connect();
    try {
        const schemaPath = path.join(process.cwd(), 'scripts', 'schema.sql');
        const schemaSql = await fs.readFile(schemaPath, 'utf8');

        console.log('Running schema.sql...');
        await client.query(schemaSql);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

seed();
