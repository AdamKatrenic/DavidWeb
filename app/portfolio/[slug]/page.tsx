import { getProjectBySlug } from "@/lib/sanity.queries";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";

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
  const { slug } = await params;
  const data = await getProjectBySlug(slug) as unknown;
  const project = data as ProjectDetail;

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <header className="max-w-3xl mb-20">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-8">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-zinc-400 text-lg leading-relaxed">
              {project.description}
            </p>
          )}
        </header>

        {project.gallery && project.gallery.length > 0 ? (
          <ProjectGallery gallery={project.gallery} title={project.title} />
        ) : (
          <p className="text-zinc-500 uppercase tracking-widest text-xs">
            Galéria neobsahuje žiadne fotky.
          </p>
        )}
      </div>
    </main>
  );
}