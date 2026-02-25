"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  data?: {
    title?: string;
    subtitle?: string;
  };
}

export default function Navbar({ data }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Domov", href: "/" },
    { name: "Portfólio", href: "/portfolio" },
    { name: "O mne", href: "/o-mne" },
    { name: "Kontakt", href: "/#kontakt" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const title = data?.title || "Dávid Pillár";
  const subtitle = data?.subtitle || "Event Videographer";

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-[90]" />

      <nav
        className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-700 ease-in-out ${
          isScrolled || isMobileMenuOpen
            ? "bg-black/40 backdrop-blur-xl py-4"
            : "bg-transparent py-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center relative h-10 w-full">
          
          {/* Branding - Na desktope viditeľný len pri scrolle, na mobile vždy pri otvorenom menu */}
          <div
            className={`transition-all duration-700 ease-in-out flex flex-col shrink-0 ${
              isScrolled || isMobileMenuOpen
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 -translate-x-10 pointer-events-none"
            }`}
          >
            <Link href="/" className="group flex flex-col">
              <span className="text-white font-bold tracking-[0.5em] uppercase text-xs md:text-sm leading-none whitespace-nowrap">
                {title}
              </span>
              <span className="text-[6px] md:text-[7px] tracking-[0.7em] text-zinc-400 uppercase mt-1.5 font-light whitespace-nowrap">
                {subtitle}
              </span>
            </Link>
          </div>

          {/* Desktop Navigačné linky */}
          <div
            className={`absolute transition-all duration-700 ease-in-out hidden md:flex items-center gap-4 lg:gap-8 whitespace-nowrap ${
              isScrolled
                ? "right-8 left-auto translate-x-0" // Posun doprava pri scrolle
                : "left-1/2 -translate-x-1/2"       // Presný stred na začiatku
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`group relative text-[10px] lg:text-[11px] uppercase tracking-[0.4em] transition-all duration-500 hover:text-white 
                    px-4 lg:px-6 py-4 flex items-center justify-center
                    ${isActive ? "text-white" : "text-zinc-400"}`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span
                    className={`absolute bottom-2 left-1/2 -translate-x-1/2 h-[1px] bg-white transition-all duration-500 ${
                      isActive ? "w-4 opacity-100" : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobilný Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden ml-auto text-white p-2 z-[110]"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>
        </div>
      </nav>

      {/* Mobilné Menu Overlay zostáva rovnaké */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[95] flex flex-col items-center justify-center p-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white text-xl uppercase tracking-[0.6em] font-light"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}