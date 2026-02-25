import { getProjectsBySpecificCategory } from "@/lib/sanity.queries";
import PortfolioClient from "@/components/PortfolioClient";
import { notFound } from "next/navigation";

// 1. Definícia typov
interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

interface Project {
  _id: string;
  title: string;
  mainImage: SanityImage;
  slug: { 
    current: string 
  };
  category?: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// STRÁNKA JE SERVEROVÝ KOMPONENT (žiadne "use client" tu nebude)
export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // Mapa kategórií
  const categoryMap: Record<string, { label: string; sanityValue: string }> = {
    "svadby": { label: "Svadby", sanityValue: "wedding" },
    "stuzkove": { label: "Stužkové", sanityValue: "concert" },
    "videoklipy": { label: "Videoklipy", sanityValue: "portrait" },
    "dokumenty": { label: "Dokumenty", sanityValue: "landscape" },
  };

  const categoryConfig = categoryMap[slug];

  if (!categoryConfig) {
    return notFound();
  }

  // Načítanie dát na serveri
  const projects = await getProjectsBySpecificCategory(categoryConfig.sanityValue) as Project[];

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 text-white">
      <div className="max-w-7xl mx-auto px-8">
        
        <header className="mb-16">
          {/* Používame čisté HTML/CSS bez motion, aby sme nemuseli použiť "use client" */}
          <div className="animate-in fade-in slide-in-from-left-4 duration-1000">
            <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 mb-4 block">
              Portfólio / Kategória
            </span>
            <h1 className="text-5xl md:text-8xl font-bold uppercase italic tracking-tighter">
              {categoryConfig.label}
            </h1>
            <div className="w-20 h-[1px] bg-zinc-800 mt-8" />
          </div>
        </header>

        {/* DATA PRETEČÚ DO KLIENTSKÉHO KOMPONENTU 
           PortfolioClient v sebe pravdepodobne má "use client", 
           takže tam animácie cez motion budú fungovať.
        */}
        {projects.length > 0 ? (
          <PortfolioClient categorizedProjects={{ [categoryConfig.label]: projects }} />
        ) : (
          <div className="py-20 border-t border-white/5">
            <p className="text-zinc-600 uppercase tracking-[0.3em] text-[10px]">
              V tejto kategórii zatiaľ nie sú zverejnené žiadne projekty.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}