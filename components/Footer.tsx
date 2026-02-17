import Link from "next/link";
import { SETTINGS_QUERY_RESULT } from "@/lib/sanity.types";

interface FooterProps {
  settings: SETTINGS_QUERY_RESULT;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (!settings) return null;

  return (
    <footer className="bg-black py-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16 text-center">
          {settings.instagram && (
            <Link 
              href={settings.instagram} 
              target="_blank" 
              className="group"
            >
              <p className="text-[10px] tracking-[0.4em] text-zinc-500 group-hover:text-white transition-colors duration-500">
                INSTAGRAM
              </p>
              <div className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-500 mt-1 mx-auto" />
            </Link>
          )}

          {settings.email && (
            <Link 
              href={`mailto:${settings.email}`} 
              className="group"
            >
              <p className="text-[10px] tracking-[0.4em] text-zinc-500 group-hover:text-white transition-colors duration-500">
                EMAIL ME
              </p>
              <div className="h-[1px] w-0 group-hover:w-full bg-white transition-all duration-500 mt-1 mx-auto" />
            </Link>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-[9px] tracking-[0.5em] text-zinc-700 uppercase">
            © {currentYear} {settings.copyright || "David Pilar Studio"}
          </p>
          
          <div className="w-12 h-[1px] bg-zinc-800 mt-4" />
        </div>
      </div>
    </footer>
  );
}