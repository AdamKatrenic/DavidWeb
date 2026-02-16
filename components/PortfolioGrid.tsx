import Image from 'next/image';
import Link from "next/link";
import { urlFor } from "@/app/sanity";
import { PROJECTS_QUERY_RESULT } from '@/lib/sanity.types';

interface PortfolioGridProps {
  projects: PROJECTS_QUERY_RESULT;
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  if (!projects || projects.length === 0) {
    return <div className="py-20 text-center text-zinc-500">Momentálne tu nie sú žiadne projekty.</div>;
  }

  return (
    <section id="portfolio" className="px-6 md:px-10 py-20 bg-black">
      <h2 className="text-5xl font-bold mb-12 tracking-tighter uppercase text-center md:text-left text-white">
        Portfólio
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link 
            href={`/portfolio/${project.slug}`} 
            key={project._id} 
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-zinc-900">
              {project.mainImage?.asset && (
                <Image 
                  src={urlFor(project.mainImage).width(800).url()} 
                  alt={project.title || "Projekt"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-medium uppercase tracking-widest text-white">
                {project.title}
              </h2>
              <p className="text-zinc-500 text-sm">Zobraziť projekt →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}