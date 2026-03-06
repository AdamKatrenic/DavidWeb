import type { Metadata, Viewport } from "next"; // Pridaný Viewport
import { Geist, Geist_Mono } from "next/font/google";
import { getSettings, getNavbar } from "@/lib/sanity.queries";
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

// Viewport sa v Next.js 14+ definuje samostatne
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://davidpillar.sk"), // Sem pôjde Davidova doména
  title: {
    default: "Dávid Pillár | Event Videographer",
    template: "%s | Dávid Pillár" // Ak budeš mať podstránky, napr. "Galéria | Dávid Pillár"
  },
  description: "Profesionálny eventový videograf so zameraním na zachytenie unikátnej atmosféry vašich podujatí.",
  keywords: ["videograf", "event videography", "Bratislava", "tvorba videa", "Dávid Pillár", "svadobné video"],
  authors: [{ name: "Dávid Pillár" }],
  alternates: {
    canonical: 'https://davidpillar.sk',
  },
  
  // SEO pre sociálne siete (Facebook, Instagram, LinkedIn)
  openGraph: {
    title: "Dávid Pillár | Event Videographer",
    description: "Profesionálna tvorba eventových videí.",
    url: "https://davidpillar.sk", // Sem pôjde Davidova doména
    siteName: "Dávid Pillár",
    locale: "sk_SK",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Nezabudni pridať tento obrázok do /public priečinka (1200x630px)
        width: 1200,
        height: 630,
        alt: "Dávid Pillár Videography",
      },
    ],
  },
  
  // Twitter (X) karty
  twitter: {
    card: "summary_large_image",
    title: "Dávid Pillár | Event Videographer",
    description: "Profesionálna tvorba eventových videí.",
    images: ["/og-image.jpg"],
  },

  // Ikony (umiestni ich do /public)
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, navbarData] = await Promise.all([
    getSettings(),
    getNavbar()
  ]);

  return (
    <html lang="sk" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen flex flex-col`}
      >
        <Navbar data={navbarData} />
        
        {/* Pridal som flex-grow, aby Footer neostal v strede obrazovky na krátkych podstránkach */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer settings={settings} />
      </body>
    </html>
  );
}