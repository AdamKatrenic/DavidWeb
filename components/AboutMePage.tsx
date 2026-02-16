import Image from "next/image";
import { urlFor } from "@/app/sanity";
import { PortableText, PortableTextProps } from "@portabletext/react";
import { AboutData } from "@/lib/types";

interface AboutMePageProps {
  aboutData: AboutData | null;
}

export default function AboutMePage({ aboutData }: AboutMePageProps) {

  if (!aboutData) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center bg-zinc-950 text-zinc-500 border border-dashed border-zinc-800 m-10">
        <p className="text-sm tracking-widest uppercase">Dáta pre sekciu o mne sa nenačítali</p>
        <span className="text-[10px] mt-2 opacity-50">Skontroluj Sanity Studio alebo Query</span>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      
      {/* 1. FOTKA NA POZADÍ */}
      {aboutData.aboutImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(aboutData.aboutImage).width(2000).url()}
            alt={aboutData.title}
            fill
            priority
            className="object-cover object-center opacity-50" // Nižšia opacita pre lepšiu čitateľnosť textu
          />
          {/* Sofistikované tmavé prechody pre "filmový" look */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* 2. OBSAH (Centrovaný text) */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="space-y-10">
          
          {/* Malý nadpis / Meno */}
          <div className="tracking-[0.6em] text-[10px] md:text-xs text-white/50 uppercase">
            {aboutData.title}
          </div>

          {/* Hlavný textový blok */}
          <div className="text-lg md:text-2xl leading-relaxed text-zinc-100 max-w-3xl mx-auto font-light italic">
            {Array.isArray(aboutData.description) ? (
              <PortableText 
                value={aboutData.description as PortableTextProps['value']} 
                components={{
                  block: {
                    // Pridáme medzery medzi odsekmi, aby to nebola jedna kopa textu
                    normal: ({children}) => <p className="mb-8 last:mb-0">{children}</p>,
                  }
                }}
              />
            ) : (
              <p>{aboutData.description}</p>
            )}
          </div>

          {/* Dekoratívna čiara na konci */}
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-12" />
        </div>
      </div>
    </section>
  );
}