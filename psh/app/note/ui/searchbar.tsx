'use client'
import { useState } from "react";

export default function SearchBar() {
    const [search, setSearch] = useState('');
    return (
        <input placeholder="search" className="grow bg-transparent border-b-2 focus:outline-none px-1" value={search} onChange={e => setSearch(e.target.value)} />
    )
}