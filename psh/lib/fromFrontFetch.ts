import { noteContent } from "./type";

const PATH = '/api/note';

export async function getData() {
    try {
        const data = await fetch(PATH, { method: 'GET'});
        const response: noteContent[] = await data.json();
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function postData(data: noteContent) {
    try {
        const result = await fetch(PATH, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        const response = await result.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}