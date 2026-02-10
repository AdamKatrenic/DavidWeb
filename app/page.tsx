import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">
            David Pilar
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mt-4 tracking-[0.2em] uppercase">
            Visual Storyteller / Photographer
          </p>
        </div>
        
        {/* Tu bude neskôr fotka zo Sanity, teraz tam dajme tmavý gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
      </section>

      {/* Sekcia pre Galériu (zatiaľ len nadpis) */}
      <section className="px-10 py-20">
        <h2 className="text-3xl font-light">Najnovšie práce</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {/* Tu budeme neskôr mapovať projekty */}
          <div className="aspect-[4/5] bg-zinc-900 animate-pulse" />
          <div className="aspect-[4/5] bg-zinc-900 animate-pulse" />
          <div className="aspect-[4/5] bg-zinc-900 animate-pulse" />
        </div>
      </section>
    </main>
  )
}