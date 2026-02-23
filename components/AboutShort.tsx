"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/app/sanity";
import type { SanityImageSource } from "@sanity/asset-utils";

interface AboutShortProps {
  data: {
    overline?: string;
    title?: string;
    text?: string;
    image?: SanityImageSource;
    ctaText?: string;
  };
}

export default function AboutShort({ data }: AboutShortProps) {
  // Ochrana pred chýbajúcimi dátami
  if (!data) return null;

  // Destrukturalizácia s fallback hodnotami pre lepšiu čitateľnosť
  const { 
    overline = "Príbeh za kamerou", 
    title = "Dávid \n Pillár", 
    text, 
    image, 
    ctaText = "Zistiť viac o mne —" 
  } = data;

  return (
    <section className="bg-black text-white py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Ľavá strana - Text */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-4 font-medium">
                {overline}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic leading-[1.1] whitespace-pre-line">
                {title}
              </h2>
              {text && (
                <p className="mt-8 text-zinc-400 font-light leading-relaxed text-sm md:text-base max-w-md">
                  {text}
                </p>
              )}
            </motion.div>

            <Link href="/o-mne" className="inline-block group">
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold group-hover:text-zinc-400 transition-colors duration-300">
                {ctaText}
              </span>
              <div className="h-[1px] w-full bg-white/10 mt-1 group-hover:bg-white/40 transition-colors duration-300" />
            </Link>
          </div>

          {/* Pravá strana - Fotka */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 group"
            >
              {image ? (
                <Image
                  src={urlFor(image).width(1200).url()}
                  alt={title.replace("\n", " ")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 animate-pulse" />
              )}
              {/* Jemná vinetácia pre hĺbku */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}