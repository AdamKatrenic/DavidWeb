import Image from 'next/image'
import { client, urlFor } from './sanity'

async function getProjects() {
  const query = `*[_type == "project"] {
    _id,
    title,
    mainImage,
    "slug": slug.current
  }`;
  return await client.fetch(query);
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-12 tracking-tighter">PORTFÓLIO</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: any) => (
          <div key={project._id} className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-zinc-900">
              {project.mainImage && (
                <Image 
                  src={urlFor(project.mainImage).width(800).url()} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-medium uppercase tracking-widest">{project.title}</h2>
              <p className="text-zinc-500 text-sm">Zobraziť projekt →</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}