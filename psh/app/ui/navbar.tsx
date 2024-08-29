export default function NavBar () {

    const links : string[] = [
        "Chat",
        "Study"
    ]

    return (
        <nav className="h-screen w-64 bg-slate-50 pt-5">
            {
                links.map((link) => {
                    return(
                    <div className="p-1 m-2 hover:bg-slate-100 duration-100" key={link}>
                        {link}
                    </div>
                    )
                })
            }
        </nav>
    )
}