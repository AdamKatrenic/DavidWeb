"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Domov", href: "/" },
    { name: "Portfólio", href: "/#portfolio" },
    { name: "O mne", href: "/o-mne" },
    { name: "Kontakt", href: "/#kontakt" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/5" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <Link href="/" className="group flex flex-col">
          <span className="text-white font-bold tracking-[0.4em] uppercase text-sm md:text-base leading-none">
            Dávid Pillár
          </span>
          <span className="text-[8px] tracking-[0.6em] text-zinc-500 uppercase mt-1 group-hover:text-zinc-300 transition-colors">
            Event Videographer
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:text-white relative pb-1 ${
                  isActive ? "text-white" : "text-zinc-500"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white animate-in fade-in slide-in-from-left-1 duration-500" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="md:hidden">
            <Link href="/#kontakt" className="text-[9px] tracking-[0.3em] border border-white/20 px-4 py-2 uppercase hover:bg-white hover:text-black transition-all">
                Kontakt
            </Link>
        </div>
      </div>
    </nav>
  );
}