import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSettings, getNavbar } from "@/lib/sanity.queries"; // Pridaný getNavbar
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
  title: "Dávid Pillár | Event Videographer", // Mierne som upravil title pre lepší branding
  description: "Profesionálny eventový videograf.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Načítame dáta paralelne, aby sme nezdržiavali render
  const [settings, navbarData] = await Promise.all([
    getSettings(),
    getNavbar()
  ]);

  return (
    <html lang="sk" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* Posielame dáta zo Sanity do Navbaru */}
        <Navbar data={navbarData} />
        
        <main>
          {children}
        </main>

        <Footer settings={settings} />
      </body>
    </html>
  );
}