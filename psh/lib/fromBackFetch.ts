import { noteContent } from "./type";

const PATH = 'http://localhost:3000/api/note';

export async function getData() {
    try {
        const data = await fetch(PATH, { method: 'GET', next: { revalidate: 10 } });
        const response: noteContent[] = await data.json();
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}