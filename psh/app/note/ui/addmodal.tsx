'use client'
import { postData } from "@/lib/fromFrontFetch";
import { noteContent } from "@/lib/type";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa6";

//서버에서 받아들일때 필요하기때문에 content type application json은 필수

export default function AddModal() {
    const [data, setData] = useState<noteContent>({
        title: '',
        content: ''
    });
    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        console.log(data);
    }
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        postData(data);
        console.log('post finished');
    }
    return (
        <form onSubmit={handleSubmit} className="bg-slate-100 rounded-lg p-4 pb-2">
            <label htmlFor="title" className="block">title</label>
            <textarea id="title" name="title" value={data.title} rows={1} cols={30} onChange={handleChange} />
            <label htmlFor='content' className="block">content</label>
            <textarea id='content' name="content" value={data.content} rows={6} cols={30} onChange={handleChange} />
            <button type="submit" className="block mx-auto p-2"><FaRegPaperPlane /></button>
        </form>
    )
}