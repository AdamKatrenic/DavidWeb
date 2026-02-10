import Image from 'next/image'
import { client, urlFor } from './sanity'
import Link from "next/link";

// Definícia typu pre projekt (dobrá prax v TS)
interface Project {
  _id: string;
  title: string;
  mainImage: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  slug: string;
}

async function getProjects(): Promise<Project[]> {
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
    <main className="min-h-screen bg-black text-white">
      {/* ============================================================
          HERO SECTION
         ============================================================ */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">
            David Pilar
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mt-4 tracking-[0.2em] uppercase">
            Visual Storyteller / Photographer
          </p>

          <nav className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-10">
            <Link href="/" className="nav-link">DOMOV</Link>
            <Link href="/about" className="nav-link">O MNE</Link>
            <Link href="/portfolio" className="nav-link">PORTFOLIO</Link>
            <Link href="/faq" className="nav-link">FAQ</Link>
            <Link href="/blog" className="nav-link">BLOG</Link>
            <Link href="/contact" className="nav-link">KONTAKT</Link>
          </nav>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
      </section>

      {/* ============================================================
          PORTFÓLIO SEKCOIA
         ============================================================ */}
      <section className="px-6 md:px-10 py-20">
        <h2 className="text-5xl font-bold mb-12 tracking-tighter uppercase text-center md:text-left">
          Portfólio
        </h2>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link href={`/portfolio/${project.slug}`} key={project._id} className="group cursor-pointer">
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
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          KONTAKTNÝ SEKCOIA
         ============================================================ */}
      <section className="bg-zinc-950 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            
            <div className="md:pr-10">
              <div className="text-xl tracking-[0.25em] uppercase text-white/90">Kontakt</div>
              <p className="mt-6 text-sm md:text-base text-white/70 leading-relaxed max-w-md">
                Prosím kontaktujte ma cez formulár alebo priamo na e-mail. Ozvem sa čo najskôr.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <div className="text-xs tracking-[0.3em] uppercase text-white/60">E-mail</div>
                  <div className="mt-2 text-sm md:text-base text-white">davidpilar@gmail.com</div>
                </div>
                <div>
                  <div className="text-xs tracking-[0.3em] uppercase text-white/60">Telefón</div>
                  <div className="mt-2 text-sm md:text-base text-white">+421 900 000 000</div>
                </div>

                <div className="pt-2 flex items-center gap-6">
                  <a className="text-sm md:text-base font-medium hover:underline text-[#1877F2]" href="#">Facebook</a>
                  <a className="text-sm md:text-base font-medium hover:underline" href="#">
                    <span className="bg-gradient-to-r from-[#FEDA77] via-[#FD1D1D] to-[#833AB4] text-transparent bg-clip-text font-bold">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 md:p-8">
              <form className="space-y-4">
                {[
                  { label: 'Meno', name: 'name', type: 'text' },
                  { label: 'Telefón', name: 'phone', type: 'tel' },
                  { label: 'Email', name: 'email', type: 'email' },
                  { label: 'Dátum', name: 'date', type: 'date' },
                  { label: 'Miesto', name: 'location', type: 'text' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs tracking-[0.25em] uppercase text-white/60">{field.label}</label>
                    <input className="mt-2 w-full bg-white text-black px-4 py-3 outline-none" type={field.type} name={field.name} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs tracking-[0.25em] uppercase text-white/60">Správa</label>
                  <textarea className="mt-2 w-full bg-white text-black px-4 py-3 outline-none min-h-[140px]" name="message" />
                </div>
                <button type="submit" className="w-48 bg-white text-black px-6 py-3 uppercase tracking-[0.25em] text-xs hover:bg-gray-200 transition">
                  Odoslať
                </button>
              </form>
            </div>
          </div>

          <div className="mt-14 text-center text-xs tracking-[0.25em] text-white/40 uppercase">
            © {new Date().getFullYear()} David Pilar Photography
          </div>
        </div>
      </section>
    </main>
  );
}