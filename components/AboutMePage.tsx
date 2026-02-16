import Image from "next/image";
import { urlFor } from "@/app/sanity";
import { PortableText } from "@portabletext/react";
import { ABOUT_QUERY_RESULT } from "@/lib/sanity.types";

interface AboutMePageProps {
  aboutData: ABOUT_QUERY_RESULT;
}

export default function AboutMePage({ aboutData }: AboutMePageProps) {
  // 2. Ošetrenie prázdnych dát zostáva
  if (!aboutData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Dáta sa nenašli.
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      
      {/* 3. FOTKA NA POZADÍ - urlFor teraz presne vie, čo dostáva */}
      {aboutData.aboutImage?.asset && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(aboutData.aboutImage).width(2000).url()}
            alt={aboutData.title || "O mne"} // Ak by title náhodou chýbal
            fill
            priority
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* 4. OBSAH */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="space-y-10">
          
          {/* Meno / Sekcia */}
          <div className="tracking-[0.6em] text-[10px] md:text-xs text-white/50 uppercase">
            {aboutData.title}
          </div>

          {/* Hlavný textový blok */}
          <div className="text-lg md:text-2xl leading-relaxed text-zinc-100 max-w-3xl mx-auto font-light italic">
            {/* Typegen vie, či je description PortableText (pole objektov) 
               alebo string. Vďaka tomu môžeme podmienku zjednodušiť.
            */}
            {Array.isArray(aboutData.description) ? (
              <PortableText 
                value={aboutData.description} 
                components={{
                  block: {
                    normal: ({ children }) => <p className="mb-8 last:mb-0">{children}</p>,
                  }
                }}
              />
            ) : (
              <p>{aboutData.description}</p>
            )}
          </div>

          {/* Dekoratívna čiara */}
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-12" />
        </div>
      </div>
    </section>
  );
}