'use client'
import { errorData } from "@/lib/data";
import { deleteData } from "@/lib/fromFrontFetch";
import { noteContent } from "@/lib/type";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";

export default function DeleteModal({ content, setDeleteVisible }: { content: noteContent, setDeleteVisible: Dispatch<SetStateAction<boolean>> }) {
    const [data, setData] = useState(errorData);
    useEffect(() => setData(content), [content.content]);
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        deleteData(data);
        setDeleteVisible(false);
    }
    return (
        <form onSubmit={handleSubmit} className="bg-slate-100 rounded-lg p-4 pb-2">
            <p className="mx-auto">delete '{data.title}' ?</p>
            <button type="submit" className="block mx-auto p-2"><FaTrash /></button>
        </form>
    )
}