import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/app/sanity";
import { HERO_QUERY_RESULT } from "@/lib/sanity.types";

interface HeroProps {
  data: HERO_QUERY_RESULT;
}

export default function Hero({ data }: HeroProps) {
  if (!data) {
    throw new Error("Hero data not found in Sanity. Please check your 'homePage' document.");
  }

  const getHref = (item: string) => {
    switch (item) {
      case 'DOMOV': return '/';
      case 'O MNE': return '/o-mne';
      case 'PORTFOLIO': return '/#portfolio';
      case 'KONTAKT': return '/#kontakt';
      case 'BOOKING': return '/booking';
      default: return '/';
    }
  };

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-950">
      {data.heroImage?.asset && (
        <Image
          src={urlFor(data.heroImage).width(2000).url()}
          alt={data.title || "David Pilar Photography Hero"}
          fill
          priority
          className="object-cover object-center"
        />
      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="z-10 text-center px-6">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          {data.title}
        </h1>
        
        {data.welcomeText && (
          <p className="text-lg md:text-xl text-zinc-200 mt-6 tracking-[0.3em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] max-w-2xl mx-auto leading-relaxed">
            {data.welcomeText}
          </p>
        )}

        <nav className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {['DOMOV', 'O MNE', 'PORTFOLIO', 'KONTAKT', 'BOOKING'].map((item) => (
             <Link 
               key={item} 
               href={getHref(item)} 
               className="text-[10px] md:text-sm tracking-[0.4em] text-white/70 hover:text-white transition-all duration-300 hover:scale-110 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-medium"
             >
               {item}
             </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}