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
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const wsUrl = `wss://${window.location.host}/api/chat`;
        const ws = new WebSocket(wsUrl);
        ws.onopen = () => {
            console.log("chat server connected");
            ws.send(JSON.stringify({ username: username, chatting: "hello" }));
        };

        ws.onmessage = (message) => {
            console.log(message.data);
            const ms = JSON.parse(message.data);
            setChat(prev => [...prev, ms]);
        };

        return () => {
            ws.close();
        }
    }, [])


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
                wsRef.current?.send(JSON.stringify({ username, chatting: input }))
                setInput('');
            }}>send</button>
            <input value={input} onChange={e => setInput(e.target.value)} />
        </>

    )
} 