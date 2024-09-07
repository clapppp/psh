'use client'
import { useState } from "react";

type props = {
    setname: React.Dispatch<React.SetStateAction<string>>;
    setentered: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NameModal({ setname,setentered }: props) {
    const [value, setValue] = useState<string>('');
    return (
        <>
                <input placeholder="Enter Name" onChange={e => {
                    setValue(e.target.value);
                }} onKeyDown={e => {
                    if (e.key === "Enter") {
                        setname(value);
                        setentered(true);
                    }
                }} className="p-2 shadow-lg rounded-md outline-none"/>
        </>
    )
}