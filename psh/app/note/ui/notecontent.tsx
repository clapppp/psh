'use client'
import { noteContent } from "@/lib/type"
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModifyModal from "./modifymodal";
import DeleteModal from "./deletemodal";

type props = {
    contents: noteContent[],
}

export default function NoteContent({ contents }: props) {
    const [visible, setVisible] = useState([false, false]);

    return (
        <div>
            {contents?.map((content, index) => {
                return (
                    <div className="border rounded-lg" key={index}>
                        <p className="m-2">{content.title}</p>
                        <p className="m-2">{content.content}</p>
                        <div className="h-6">
                            <button onClick={() => setVisible([true, visible[1]])} className="h-6 rounded-bl-lg hover:bg-slate-300 w-1/2 transition-all"><FaEdit className="mx-auto" /></button>
                            <button onClick={() => setVisible([visible[0], true])} className="h-6 rounded-br-lg hover:bg-slate-300 w-1/2 transition-all"><FaTrash className="mx-auto" /></button>

                            <div onClick={() => setVisible([false, visible[1]])} className={`${visible[0] ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm`} />
                            <div className={`${visible[0] ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} transition-all absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                                <ModifyModal content={content} />
                            </div>

                            <div onClick={() => setVisible([visible[0], false])} className={`${visible[1] ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm`} />
                            <div className={`${visible[1] ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} transition-all absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                                <DeleteModal />
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}