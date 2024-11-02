import { NextResponse } from 'next/server';
import { createConnection } from '../../../lib/db.js';

export async function GET() {
    try {
        const db = await createConnection();
        const sql = "SELECT * FROM members";
        const [members] = await db.query(sql);
        return NextResponse.json(members);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}
