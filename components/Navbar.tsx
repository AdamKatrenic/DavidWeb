"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Interface pre dáta zo Sanity
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fixné linky (môžeš ich neskôr tiež vytiahnuť zo Sanity ak chceš)
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
      
      if (pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(href);
      }
    }
  };

  // Dáta zo Sanity s fallbackom
  const title = data?.title || "Dávid Pillár";
  const subtitle = data?.subtitle || "Event Videographer";

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-[90]" />

      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${
          isScrolled 
            ? "bg-black/40 backdrop-blur-xl py-4 border-b border-white/5" 
            : "bg-transparent py-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

          {/* Branding (ťahaný zo Sanity) */}
          <Link href="/" className="group flex flex-col">
            <span className="text-white font-bold tracking-[0.5em] uppercase text-sm md:text-base leading-none transition-transform group-hover:translate-x-1 duration-500">
              {title}
            </span>
            <span className="text-[7px] tracking-[0.7em] text-zinc-400 uppercase mt-1.5 group-hover:text-white transition-colors duration-500">
              {subtitle}
            </span>
          </Link>

          {/* Navigačné linky (ostali zachované) */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[9px] uppercase tracking-[0.4em] transition-all duration-500 hover:text-white relative py-1 ${
                    isActive ? "text-white" : "text-zinc-400"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-500 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Mobilné tlačidlo Kontakt */}
          <div className="md:hidden">
              <Link 
                href="/#kontakt" 
                onClick={(e) => handleNavClick(e, "/#kontakt")}
                className="text-[8px] tracking-[0.3em] border border-white/10 px-6 py-2.5 uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
              >
                  Kontakt
              </Link>
          </div>
        </div>
      </nav>
    </>
  );
}