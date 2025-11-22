import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is missing in environment variables');
}

// Use a global variable to prevent multiple pools in development
let pool: Pool;

if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
        connectionString,
    });
} else {
    if (!(global as any).postgresPool) {
        (global as any).postgresPool = new Pool({
            connectionString,
        });
    }
    pool = (global as any).postgresPool;
}

export default pool;
