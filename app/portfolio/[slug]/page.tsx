import { getProjectBySlug } from "@/lib/sanity.queries";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";

export const dynamic = "force-dynamic";

// Presná definícia typu pre projekt, aby sme sa vyhli any/unknown
interface ProjectDetail {
  _id: string;
  title: string;
  description?: string;
  gallery?: {
    asset: {
      _ref: string;
      _type: string;
    };
    _key?: string;
  }[];
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 1. Rozbalíme params (Next.js 15+ štandard)
  const { slug } = await params;

  // 2. Získame dáta priamo s typom
  const project = await getProjectBySlug(slug) as ProjectDetail | null;

  // 3. Ak projekt neexistuje, vrátime 404
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header sekcia s animovaným prístupom */}
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

        {/* Galéria projektu */}
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