import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./ui/navbar";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter}`}>
        <div className="pr-8 absolute -left-64 hover:left-0 ease-out duration-300">
          <NavBar />
        </div>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
