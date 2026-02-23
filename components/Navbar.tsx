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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // Extra fix pre iOS/iPad
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    }
  }, [isMobileMenuOpen]);

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
          {/* Zmena: pridali sme w-full a odstránili relative, ak nie je nutné pre absolútne centrovanie */}
          <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-10 w-full">

            {/* Branding - shrink-0 zaistí, že logo nezmenší svoju šírku */}
            <div
                className={`transition-all duration-700 ease-in-out flex flex-col shrink-0 ${
                    isScrolled || isMobileMenuOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-10 pointer-events-none md:pointer-events-auto md:opacity-100 md:translate-x-0"
                }`}
            >
              <Link href="/" className="group flex flex-col">
              <span className="text-white font-bold tracking-[0.5em] uppercase text-xs md:text-base leading-none whitespace-nowrap">
                {title}
              </span>
                <span className="text-[6px] md:text-[7px] tracking-[0.7em] text-zinc-400 uppercase mt-1.5 font-light whitespace-nowrap">
                {subtitle}
              </span>
              </Link>
            </div>

            {/* Desktop Navigačné linky - prerobené na stabilnejší flexbox */}
            <div className="hidden md:flex items-center gap-1 md:gap-4 lg:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`group relative text-[10px] lg:text-[11px] uppercase tracking-[0.3em] lg:tracking-[0.4em] transition-all duration-500 hover:text-white 
                    px-3 lg:px-6 py-4 flex items-center justify-center whitespace-nowrap
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
                className="md:hidden text-white p-2 z-[110] transition-transform active:scale-90"
                aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black z-[95] flex flex-col items-center justify-center p-8 md:hidden"
              >
                {/* Vnútro mobilného menu zostáva podobné */}
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