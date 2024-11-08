'use client'
import { postData } from "@/lib/dataFetch";
import { ChangeEvent, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa6";

export default function AddModal() {
    const [data, setData] = useState({
        title: '',
        content: ''
    });
    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {

    }
    function handleSubmit() {

    }
    return (
        <form onSubmit={handleSubmit} className="bg-slate-100 rounded-lg p-4 pb-2">
            <label htmlFor="title" className="block">title</label>
            <textarea id="title" name="title" rows={1} cols={30} onChange={handleChange} className="" />
            <label htmlFor='content' className="block">content</label>
            <textarea id='content' name="content" rows={6} cols={30} onChange={handleChange} className="" />
            <button type="submit" className="block mx-auto p-2"><FaRegPaperPlane /></button>
        </form>
    )
}