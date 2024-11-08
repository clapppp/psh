'use client'
import { putData } from "@/lib/fromFrontFetch";
import { noteContent } from "@/lib/type";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function ModifyModal({ content, setModifyVisible }: { content: noteContent, setModifyVisible: Dispatch<SetStateAction<boolean>> }) {
    const [data, setData] = useState<noteContent>({
        title: content.title,
        content: content.content
    });

    useEffect(() => setData(content), [content.content]);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        putData(data);
        setModifyVisible(false);
    }
    return (
        <form onSubmit={handleSubmit} className="bg-slate-100 rounded-lg p-4 pb-2">
            <label htmlFor="title" className="block">title</label>
            <textarea id="title" value={data.title} name="title" rows={1} cols={30} onChange={handleChange} />
            <label htmlFor='content' className="block">content</label>
            <textarea id='content' value={data.content} name="content" rows={6} cols={30} onChange={handleChange} />
            <button type="submit" className="block mx-auto p-2"><FaEdit /></button>
        </form>
    )
}