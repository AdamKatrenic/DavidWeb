import Image from 'next/image';
import Link from "next/link";
import { getProjects } from "@/lib/sanity.queries";
import { urlFor } from "@/app/sanity";

export const dynamic = "force-dynamic";

// Poriadna definícia typov bez použitia "any"
interface SanityImage {
  asset?: {
    _ref: string;
    _type: string;
  };
  _type: 'image';
}

interface Project {
  _id: string;
  title: string;
  mainImage: SanityImage; // Tu sme nahradili any
  slug: {
    current: string;
  };
  category?: string;
}

export default async function PortfolioPage() {
  // Použijeme "unknown" na premostenie dát z API k nášmu typu
  const data = await getProjects() as unknown;
  const projects = data as Project[];

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 text-white">
      <div className="max-w-7xl mx-auto px-8">
        
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
            Portfólio
          </h1>
          <div className="w-20 h-[1px] bg-zinc-800 mt-6" />
        </header>

        {(!projects || projects.length === 0) ? (
          <div className="py-20 text-center">
            <p className="text-zinc-500 uppercase tracking-widest text-[10px]">
              V Sanity sa nenašli žiadne dáta. Skontroluj, či je projekt PUBLISHED.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {projects.map((project) => {
              const slugValue = project.slug?.current;
              if (!slugValue) return null;

              return (
                <Link 
                  href={`/portfolio/${slugValue}`} 
                  key={project._id} 
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5">
                    {project.mainImage?.asset && (
                      <Image 
                        src={urlFor(project.mainImage).width(800).height(1000).url()} 
                        alt={project.title || "Projekt"}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                      />
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.4em]">
                      {project.title}
                    </h3>
                    <p className="text-[8px] text-zinc-600 uppercase tracking-[0.2em] mt-3">
                      Zobraziť detail projektu
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}