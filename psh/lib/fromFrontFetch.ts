import { noteContent } from "./type";

const PATH = '/api/note';

export async function getData() {
    try {
        const result = await fetch(PATH, { method: 'GET' });
        const response: noteContent[] = await result.json();
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
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

export async function putData(data: noteContent) {
    try {
        const result = await fetch(PATH, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteData(data: noteContent) {
    try {
        const result = await fetch(PATH, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}