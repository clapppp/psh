import { createConnection } from '@/lib/db';
import { noteContent } from '@/lib/type';

// node.js 는 api말단(res.send)에서 promise가 await가 없어도 내부적으로 await를 수행한다.

export async function GET() {
    const sql = "SELECT * FROM members";
    return query(sql);
}

export async function POST(req: Request) {
    const { title, content }: noteContent = await req.json();
    const sql = `INSERT INTO members (title, content) VALUES ('${title}', '${content}')`;
    return query(sql);
}

export async function PUT(req: Request) {
    const { title, content, id }: noteContent = await req.json();
    const sql = `UPDATE members SET title = '${title}', content = '${content}' WHERE id = ${id}`;
    return query(sql);
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    const sql = `DELETE FROM members WHERE id = ${id}`;
    return query(sql);
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