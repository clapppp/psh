import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./ui/navbar";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Park Suhyeon",
  description: "Park Suhyeon's playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className}`}>
        <div className="pr-10 absolute -left-64 hover:left-0 ease-out duration-300">
          <NavBar />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
