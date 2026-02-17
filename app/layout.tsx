import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSettings } from "@/lib/sanity.queries";
import Footer from "@/components/Footer"; 
import Navbar from "@/components/Navbar"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dávid Pillár Photography",
  description: "Profesionálny fotograf",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="sk" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Navbar />
        
        {children}

        <Footer settings={settings} />
      </body>
    </html>
  );
}