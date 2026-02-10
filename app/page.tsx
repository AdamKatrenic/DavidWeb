import Image from "next/image";
import Link from "next/link";

export default function Home(): JSX.Element {
  return (
      <main className="min-h-screen bg-black text-white">
        {/* ============================================================
          HERO SECTION
          - menu je nižšie (mt-16)
          - bez modrých rámčekov (len text, hover underline)
         ============================================================ */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="z-10 text-center px-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">
              David Pilar
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mt-4 tracking-[0.2em] uppercase">
              Visual Storyteller / Photographer
            </p>

            {/* ============================================================
              NAVIGÁCIA POD NADPISOM
              - nižšie + bez modrých boxov
             ============================================================ */}
            <nav className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-10">
              <Link
                  href="/"
                  className="uppercase text-xs md:text-sm tracking-[0.35em] text-gray-200 hover:text-white transition underline-offset-8 hover:underline"
              >
                DOMOV
              </Link>

              <Link
                  href="/about"
                  className="uppercase text-xs md:text-sm tracking-[0.35em] text-gray-200 hover:text-white transition underline-offset-8 hover:underline"
              >
                O MNE
              </Link>

              <Link
                  href="/portfolio"
                  className="uppercase text-xs md:text-sm tracking-[0.35em] text-gray-200 hover:text-white transition underline-offset-8 hover:underline"
              >
                PORTFOLIO
              </Link>

              <Link
                  href="/faq"
                  className="uppercase text-xs md:text-sm tracking-[0.35em] text-gray-200 hover:text-white transition underline-offset-8 hover:underline"
              >
                FAQ
              </Link>

              <Link
                  href="/blog"
                  className="uppercase text-xs md:text-sm tracking-[0.35em] text-gray-200 hover:text-white transition underline-offset-8 hover:underline"
              >
                BLOG
              </Link>

              <Link
                  href="/contact"
                  className="uppercase text-xs md:text-sm tracking-[0.35em] text-gray-200 hover:text-white transition underline-offset-8 hover:underline"
              >
                KONTAKT
              </Link>
            </nav>
          </div>

          {/* Tu bude neskôr fotka zo Sanity, teraz tam dajme tmavý gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
        </section>

        {/* ============================================================
          SEKCIA PRE GALÉRIU (ZATIAĽ LEN NADPIS)
         ============================================================ */}
        <section className="px-10 py-20">
          <h2 className="text-3xl font-light">Najnovšie práce</h2>

          {/* Tu budeme neskôr mapovať projekty */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <div className="aspect-[4/5] bg-zinc-900 animate-pulse" />
            <div className="aspect-[4/5] bg-zinc-900 animate-pulse" />
            <div className="aspect-[4/5] bg-zinc-900 animate-pulse" />
          </div>

          {/* Poznámka:
            - neskôr sem dáme reálne fotky (next/image) + klik do detailu projektu
            - napr. /portfolio/svadba-tatry-2026
         */}
        </section>
      </main>
  );
}
