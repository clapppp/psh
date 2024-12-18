import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const links: string[] = ["note"];

export default function NavBar() {
  return (
    <nav className="flex flex-col h-dvh w-40 bg-slate-50 pt-5">
      <div className="p-1 m-2 hover:bg-slate-100 duration-100">
        <Link href={"/"}>home</Link>
      </div>
      {links.map((link) => {
        return (
          <div className="p-1 m-2 hover:bg-slate-100 duration-100" key={link}>
            <Link href={`/${link}`}>{link}</Link>
          </div>
        );
      })}
      <div className="grow" />

      <div className="m-4 flex justify-center">
        <a href="https://github.com/clapppp/psh">
          <FaGithub size={24} />
        </a>
      </div>
    </nav>
  );
}
