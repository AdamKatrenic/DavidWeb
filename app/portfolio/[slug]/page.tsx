import { getProjectBySlug } from "@/lib/sanity.queries";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";

export const dynamic = "force-dynamic";

// 1. Definujeme presné typy pre galériu, ktoré očakáva komponent
interface SanityImage {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface SanityVideo {
  _type: 'youtubeVideo';
  _key: string;
  url: string;
  caption?: string;
}

// Spoločný typ pre položku galérie
type GalleryItem = SanityImage | SanityVideo;

interface ProjectDetail {
  _id: string;
  title: string;
  description?: string;
  // Tu sme zmenili typ na GalleryItem[], čo vyrieši chybu vo Verceli
  gallery?: GalleryItem[];
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Získame dáta s novým otypovaním
  const project = await getProjectBySlug(slug) as ProjectDetail | null;

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        
        <header className="max-w-3xl mb-20">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase italic mb-8">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
              {project.description}
            </p>
          )}
          <div className="w-20 h-[1px] bg-zinc-800 mt-10" />
        </header>

        {/* Teraz už TypeScript nebude protestovať, lebo gallery v ProjectDetail 
            sedí s gallery v ProjectGallery */}
        {project.gallery && project.gallery.length > 0 ? (
          <ProjectGallery gallery={project.gallery} title={project.title} />
        ) : (
          <div className="py-20 border-t border-white/5">
            <p className="text-zinc-600 uppercase tracking-[0.3em] text-[10px]">
              Tento projekt momentálne neobsahuje žiadne vizuálne materiály.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}