"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategorySectionProps {
  title: string;
  slug: string;
  subtitle: string;
  imageUrl?: string;
}

export default function CategorySection({ title, slug, subtitle, imageUrl }: CategorySectionProps) {
  return (
    <section className="relative w-full border-b border-zinc-900 bg-black group overflow-hidden">
      <Link href={`/portfolio/category/${slug}`} className="block w-full relative z-10">
        
        {/* Responzívny padding: na mobile py-24, na desktope py-48 */}
        <div className="py-24 md:py-48 transition-all duration-700 group-hover:bg-zinc-900/10">
          
          {/* Pozadie s obrázkom */}
          {imageUrl && (
            <div className="absolute inset-0 z-0">
              <Image 
                src={imageUrl} 
                alt={title} 
                fill 
                className="
                  object-cover 
                  /* Mobile: vyššia opacita a menej grayscale | Desktop: tma a grayscale */
                  opacity-30 md:opacity-20 
                  group-hover:opacity-40 
                  transition-all 
                  duration-1000 
                  scale-110 md:scale-105 
                  group-hover:scale-100
                  grayscale-0 md:grayscale 
                  group-hover:grayscale-0
                "
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 md:via-black/80 to-transparent" />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 relative z-20">
            
            <div className="space-y-2 md:space-y-4">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[0.6em] text-zinc-500 mb-2 block"
              >
                {subtitle}
              </motion.span>
              
              <h2 className="text-5xl md:text-8xl font-bold uppercase italic tracking-tighter text-zinc-300 md:text-zinc-400 group-hover:text-white transition-all duration-700 leading-tight">
                {title}
              </h2>
            </div>

            {/* Na mobile skryjeme čiaru, necháme len text 'Otvoriť' */}
            <div className="flex items-center gap-4 md:gap-8">
               <div className="hidden md:block h-[1px] w-24 bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-700 ease-in-out" />
              </div>
              
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-zinc-400 group-hover:text-white transition-all duration-500 border-b border-zinc-800 md:border-none pb-1 md:pb-0">
                Pozrieť
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}