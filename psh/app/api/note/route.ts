import { createConnection } from '@/lib/db';

export async function GET() {
    const sql = "SELECT * FROM members";
    return query(sql);
}

export async function POST() {
    
}

export async function PUT() {

}

export async function DELETE() {

}

async function query(sql: string) {
    try {
        const db = await createConnection();
        const [result] = await db.query(sql);
        return Response.json(result);
    } catch (error) {
        console.log(error);
        return Response.json({ error: String(error) });
    }
}