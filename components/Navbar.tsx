"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Ak nemáš lucide-react, nainštaluj: npm install lucide-react
import { motion, AnimatePresence } from "framer-motion"; // npm install framer-motion

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

  // Pri otvorení mobilného menu zakážeme scroll na pozadí
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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
    setIsMobileMenuOpen(false); // Vždy zavrieť menu po kliknutí
  };

  const title = data?.title || "Dávid Pillár";
  const subtitle = data?.subtitle || "Event Videographer";

  return (
    <>
      {/* Gradient tieň na vrchu */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-[90]" />

      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${
          isScrolled || isMobileMenuOpen
            ? "bg-black/40 backdrop-blur-xl py-4"
            : "bg-transparent py-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center relative h-10">
          
          {/* Branding */}
          <div
            className={`transition-all duration-700 ease-in-out flex flex-col ${
              isScrolled
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10 pointer-events-none md:pointer-events-auto md:opacity-0 md:-translate-x-10"
            } ${isMobileMenuOpen ? "opacity-100 translate-x-0" : ""}`}
          >
            <Link href="/" className="group flex flex-col">
              <span className="text-white font-bold tracking-[0.5em] uppercase text-sm md:text-base leading-none">
                {title}
              </span>
              <span className="text-[7px] tracking-[0.7em] text-zinc-400 uppercase mt-1.5 font-light">
                {subtitle}
              </span>
            </Link>
          </div>

          {/* Desktop Navigačné linky */}
          <div
            className={`absolute left-1/2 flex items-center gap-12 transition-all duration-700 ease-in-out hidden md:flex whitespace-nowrap ${
              isScrolled
                ? "translate-x-[calc(50%-0px)] left-[auto] right-0"
                : "-translate-x-1/2"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`group relative text-[11px] uppercase tracking-[0.4em] transition-all duration-500 hover:text-white 
                    px-6 py-4 -mx-2 -my-2 flex items-center justify-center
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
            className="md:hidden ml-auto text-white p-2 z-[110] transition-transform active:scale-90"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>
        </div>
      </nav>

      {/* Mobilné Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
            
            {/* Doplnkové info v menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 flex flex-col items-center gap-4"
            >
              <div className="w-8 h-[1px] bg-zinc-800" />
              <p className="text-[8px] tracking-[0.4em] text-zinc-500 uppercase italic">
                {subtitle}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}