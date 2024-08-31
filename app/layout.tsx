import type { Metadata } from "next";
import {  Roboto_Serif, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const robotoSerif = Roboto_Serif({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });


export const metadata: Metadata = {
  title: "PicShare",
  description: "Develop by Auchitya Rai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${roboto.className} ${robotoSerif.className}`}>
        <div className="flex flex-col space-y-3">
         <Header/>
         {children}
        </div>
        
        </body>
    </html>
  );
}
