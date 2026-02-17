import Image from "next/image";
import { urlFor } from "@/app/sanity";
import { HERO_QUERY_RESULT } from "@/lib/sanity.types";

interface HeroProps {
  data: HERO_QUERY_RESULT;
}

export default function Hero({ data }: HeroProps) {
  if (!data) {
    throw new Error("Hero data not found in Sanity.");
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 1. Fotka/Video na celé pozadie */}
      {data.heroImage?.asset && (
        <div className="absolute inset-0 scale-105 animate-slow-zoom">
          <Image
            src={urlFor(data.heroImage).width(2000).url()}
            alt={data.title || "David Pilar Hero"}
            fill
            priority
            className="object-cover object-center brightness-[0.7]"
          />
        </div>
      )}

      {/* 2. Prekrytie pre hĺbku a kontrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      {/* 3. Hlavný obsah - Teraz bezpečne viditeľný */}
      <div className="z-10 text-center px-6">
        <h1 className="text-5xl md:text-[10rem] font-bold tracking-[-0.05em] uppercase text-white leading-none drop-shadow-2xl">
          {data.title}
        </h1>
        
        {data.welcomeText && (
          <div className="mt-4">
            <p className="text-[10px] md:text-[12px] text-zinc-300 tracking-[1em] uppercase">
              {data.welcomeText}
            </p>
          </div>
        )}
      </div>

      {/* 4. Indikátor scrollu (jemný detail) */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-50">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  );
}