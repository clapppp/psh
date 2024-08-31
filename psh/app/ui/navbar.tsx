import { FaGithub } from "react-icons/fa";

const links: string[] = [
    "Chat",
    "Study"
]

export default function NavBar() {

    return (
        <nav className="flex flex-col h-screen w-64 bg-slate-50 pt-5 ">
            {
                links.map((link) => {
                    return (
                        <div className="p-1 m-2 hover:bg-slate-100 duration-100" key={link}>
                            {link}
                        </div>
                    )
                })
            }
            <div className="grow" />

            <div className="m-4 flex justify-center">
                <a href="https://github.com/clapppp">
                    <FaGithub size={24}/>
                </a>
            </div>
        </nav>
    )
}