'use client'
import { setScreenHeight } from "@/lib/data";
import { useEffect } from "react";

export default function NoteComponent() {
    useEffect(() => {
        setScreenHeight(window);

        async function solve() {
            try {
                const data = await fetch('/api/note');
                const response = data.json();
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        solve();
    }, [])
    return (
        <div>
            that is sql result;
        </div>
    )
}