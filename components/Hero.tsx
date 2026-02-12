import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/app/sanity";
import { SanityImage } from "@/lib/types";

interface HeroProps {
  title?: string;
  welcomeText?: string;
  heroImage?: SanityImage & { alt?:string };
}

export default function Hero({ title, welcomeText, heroImage }: HeroProps) {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* OBRÁZOK NA POZADÍ */}
      {heroImage?.asset && (
        <Image
          src={urlFor(heroImage).width(2000).url()}
          alt={heroImage.alt || "David Pilar Photography Hero"}
          fill
          priority
          className="object-cover object-center"
        />
      )}

      {/* GRADIENT OVERLAY - stmavenie pre čitateľnosť */}
      <div className="absolute inset-0 bg-black/40" />

      {/* OBSAH NAD OBRÁZKOM */}
      <div className="z-10 text-center px-6">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase drop-shadow-2xl text-white">
          {title}
        </h1>
        
        {welcomeText && (
          <p className="text-lg md:text-xl text-zinc-200 mt-6 tracking-[0.3em] uppercase drop-shadow-md max-w-2xl mx-auto leading-relaxed">
            {welcomeText}
          </p>
        )}

        {/* NAVIGÁCIA */}
        <nav className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {['DOMOV', 'O MNE', 'PORTFOLIO', 'KONTAKT', 'BOOKING'].map((item) => (
             <Link 
               key={item} 
               href={item === 'DOMOV' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
               className="text-[10px] md:text-xs tracking-[0.4em] text-white/70 hover:text-white transition-all duration-300 hover:scale-110 uppercase"
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