import NoteContent from "./ui/notecontent";
import SearchBar from "./ui/searchbar";
import AddButton from "./ui/addbutton";
import { getData } from "@/lib/fromBackFetch";
import { errorData } from "@/lib/data";

export default async function NotePage() {
    // const contents = await getData();
    return (
        <div className="flex flex-col w-1/3 mx-auto mt-10 gap-4 min-w-80">
            <div className="flex flex-row h-9 gap-4">
                <SearchBar />
                <AddButton />
            </div>
            <NoteContent /*contents={contents ?? [errorData]}*//>
        </div>
    )
}