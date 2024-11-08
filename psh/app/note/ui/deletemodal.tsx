'use client'
import { postData } from "@/lib/fromBackFetch";
import { ChangeEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa6";

export default function DeleteModal() {
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
            <p className="mx-auto">delete?</p>
            <button type="submit" className="block mx-auto p-2"><FaTrash /></button>
        </form>
    )
}