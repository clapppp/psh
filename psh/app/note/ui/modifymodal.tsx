'use client'
import { noteContent } from "@/lib/type";
import { ChangeEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa6";

export default function ModifyModal({ content }: { content: noteContent }) {
    const [data, setData] = useState({
        title: content.title,
        content: content.content
    });
    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {

    }
    function handleSubmit() {

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