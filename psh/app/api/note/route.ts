import { createConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const sql = "SELECT * FROM members";
        return query(sql);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: String(error) });
    }
}

export async function POST() {
    try {
        const sql = "INSERT INTO members (title, content) VALUES ()";
        return query(sql);
    }
}

export async function PUT() {

}

export async function DELETE() {

}

function query(sql: string) {
    const db = await createConnection();
    const [result] = await db.query(sql);
    return NextResponse.json(result);
}