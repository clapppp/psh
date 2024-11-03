'use client'
import { setScreenHeight } from "@/lib/data"
import { noteContent } from "@/lib/type"
import { useEffect } from "react"

type props = {
    contents: noteContent[],
}

export default function NoteContent({ contents }: props) {
    return (
        <div>
            {contents?.map((content, index) => {
                return (
                    <div className="border m-1" key={index}>
                        <p>{content.title}</p>
                        <p>{content.content}</p>
                    </div>
                )
            })}
        </div>
    )
}