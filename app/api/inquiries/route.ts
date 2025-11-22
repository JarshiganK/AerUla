import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO inquiries (name, email, message) VALUES ($1, $2, $3)',
                [name, email, message]
            );
            return NextResponse.json({ ok: true });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
