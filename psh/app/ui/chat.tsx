'use client'

import { useEffect, useRef, useState } from "react"
import { username } from "./playground";

type chatting = {
    username: string,
    chatting: string
}

export default function Chat() {
    const [chat, setChat] = useState<chatting[]>([]);
    const [input, setInput] = useState('');
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(`ws://${window.location.host}/api/chat`);
        ws.current.onopen = () => {
            ws.current?.send(JSON.stringify({ username, chatting: "hello" }));
        };
        ws.current.onmessage = (message) => {
            console.log(message.data);
            const ms = JSON.parse(message.data);
            setChat(prev => [...prev, ms]);
        };
        return () => {
            ws.current?.close();
        };
    }, []);


    return (
        <>
            <div className="w-80 h-32 overflow-y-auto">
                {
                    chat.map((chat, index) => {
                        return (
                            <p key={index}>{chat.username} : {chat.chatting}</p>
                        )
                    })
                }
            </div>
            <button onClick={() => {
                ws.current?.send(JSON.stringify({ username, chatting: input }))
                setInput('');
            }}>send.</button>
            <input value={input} onChange={e => setInput(e.target.value)} />
        </>

    )
} 