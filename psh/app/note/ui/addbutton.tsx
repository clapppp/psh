'use client'
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddModal from "./addmodal";

export default function AddButton() {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <button onClick={() => setVisible(true)} className="grow-0">
                <FaPlus size={20} />
            </button>
            <div onClick={() => setVisible(false)} className={`${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm`} />
            <div className={`${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} transition-all fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                <AddModal />
            </div>
        </>
    )
}