import { noteContent } from "./type";

const PATH = 'http://localhost:3000/api/note';

export async function getData() {
    try {
        const data = await fetch(PATH, { method: 'GET' });
        const response: noteContent[] = await data.json();
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function postData(req: Request) {
    try {
        const data = await fetch(PATH, {
            method: 'POST',
            body: req.body
        });
        const response = await data.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}