'use client';

import { noteContent } from "@/lib/type"
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModifyModal from "./modifymodal";
import DeleteModal from "./deletemodal";
import { getData } from "@/lib/fromFrontFetch";
import { errorData } from "@/lib/data";


export default function NoteContent() {
    const [modifyVisible, setModifyVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [modifyContent, setModifyContent] = useState<noteContent>(errorData);
    const [deleteContent, setDeleteContent] = useState<noteContent>(errorData);
    const [contents, setContents] = useState<noteContent[]>([{
        title: '',
        content: ''
    }])

    useEffect(() => {
        async function fetchData() {
            const data = await getData() ?? [errorData];
            setContents(data);
        }
        fetchData();
    }, [])

    return (
        <>
            {contents?.map((content,index) => {
                return (
                    <div className="border rounded-lg" key={index}>

                        <p className="m-2">{content.title}</p>
                        <p className="m-2">{content.content}</p>

                        <div className="h-6">

                            <button onClick={() => {
                                setModifyVisible(true);
                                setModifyContent(content);
                            }} className="h-6 rounded-bl-lg hover:bg-slate-300 w-1/2 transition-all"><FaEdit className="mx-auto" /></button>
                            <button onClick={() => {
                                setDeleteVisible(true);
                                setDeleteContent(content);
                             }} className="h-6 rounded-br-lg hover:bg-slate-300 w-1/2 transition-all"><FaTrash className="mx-auto" /></button>

                        </div>
                    </div>
                )
            })}

            <div onClick={() => setModifyVisible(false)} className={`${modifyVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm`} />
            <div className={`${modifyVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} transition-all absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                <ModifyModal setModifyVisible={setModifyVisible} content={modifyContent} />
            </div>

            <div onClick={() => setDeleteVisible(false)} className={`${deleteVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm`} />
            <div className={`${deleteVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} transition-all absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                <DeleteModal setDeleteVisible={setDeleteVisible} content={deleteContent} />
            </div>

        </>
    )
}