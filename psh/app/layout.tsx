import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./ui/navbar";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Park Suhyeon",
  description: "Park Suhyeon Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;//children은 같은디렉토리의 page파일
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className}`}>
        <div className="pr-10 fixed top-0 -left-40 hover:left-0 ease-out duration-300">
          <NavBar />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
