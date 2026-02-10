

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


            {/* NAVIGÁCIA POD NADPISOM */}

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

          SEKCIA PRE GALÉRIU (ZATIAĽ PLACEHOLDERY)

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


        {/* ============================================================
          KONTAKTNÝ "FOOTER" BLOK (ako na ukážke)
          - bude neskôr spoločný komponent na každom page
         ============================================================ */}
        <section className="bg-zinc-950 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* ĽAVO: info */}
              <div className="md:pr-10">
                <div className="text-xl tracking-[0.25em] uppercase text-white/90">
                  Kontakt
                </div>

                <p className="mt-6 text-sm md:text-base text-white/70 leading-relaxed max-w-md">
                  Prosím kontaktujte ma cez formulár alebo priamo na e-mail.
                  Ozvem sa čo najskôr.
                </p>

                <div className="mt-10 space-y-6">
                  <div>
                    <div className="text-xs tracking-[0.3em] uppercase text-white/60">
                      E-mail
                    </div>
                    <div className="mt-2 text-sm md:text-base text-white">
                      davidpilar@gmail.com
                    </div>
                  </div>

                  <div>
                    <div className="text-xs tracking-[0.3em] uppercase text-white/60">
                      Telefón
                    </div>
                    <div className="mt-2 text-sm md:text-base text-white">
                      +421 900 000 000
                    </div>
                  </div>

                  {/* SOCIÁLNE SIETE */}
                  <div className="pt-2 flex items-center gap-6">
                    {/* Facebook = modrý */}
                    <a
                        className="text-sm md:text-base font-medium hover:underline underline-offset-4"
                        href="#"
                    >
                      <span className="text-[#1877F2]">Facebook</span>
                    </a>

                    {/* Instagram = farebné písmená (IG gradient vibe) */}
                    <a
                        className="text-sm md:text-base font-medium hover:underline underline-offset-4"
                        href="#"
                        aria-label="Instagram"
                    >
                    <span className="inline-flex">
                      <span className="text-[#FEDA77]">I</span>
                      <span className="text-[#FCAF45]">n</span>
                      <span className="text-[#F77737]">s</span>
                      <span className="text-[#F56040]">t</span>
                      <span className="text-[#FD1D1D]">a</span>
                      <span className="text-[#E1306C]">g</span>
                      <span className="text-[#C13584]">r</span>
                      <span className="text-[#833AB4]">a</span>
                      <span className="text-[#5851DB]">m</span>
                    </span>
                    </a>
                  </div>

                  {/* Poznámka:
                    - keď budeš mať reálne linky, len vymeň href:
                    - Facebook: href="https://facebook.com/xxx"
                    - Instagram: href="https://instagram.com/xxx"
                */}
                </div>
              </div>

              {/* PRAVO: formulár */}
              <div className="bg-white/5 border border-white/10 p-6 md:p-8">
                {/* Poznámka:
                  - zatiaľ je to len UI
                  - potom spravíme POST na /api/contact (Next.js route) a pošleme email adminovi
               */}
                <form className="space-y-4">
                  <div>
                    <label className="block text-xs tracking-[0.25em] uppercase text-white/60">
                      Meno
                    </label>
                    <input
                        className="mt-2 w-full bg-white text-black px-4 py-3 outline-none"
                        placeholder=""
                        type="text"
                        name="name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.25em] uppercase text-white/60">
                      Telefón
                    </label>
                    <input
                        className="mt-2 w-full bg-white text-black px-4 py-3 outline-none"
                        placeholder=""
                        type="tel"
                        name="phone"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.25em] uppercase text-white/60">
                      Email
                    </label>
                    <input
                        className="mt-2 w-full bg-white text-black px-4 py-3 outline-none"
                        placeholder=""
                        type="email"
                        name="email"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.25em] uppercase text-white/60">
                      Dátum
                    </label>
                    <input
                        className="mt-2 w-full bg-white text-black px-4 py-3 outline-none"
                        type="date"
                        name="date"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.25em] uppercase text-white/60">
                      Miesto
                    </label>
                    <input
                        className="mt-2 w-full bg-white text-black px-4 py-3 outline-none"
                        placeholder=""
                        type="text"
                        name="location"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.25em] uppercase text-white/60">
                      Správa
                    </label>
                    <textarea
                        className="mt-2 w-full bg-white text-black px-4 py-3 outline-none min-h-[140px]"
                        name="message"
                    />
                  </div>

                  <button
                      type="button"
                      className="w-48 bg-white text-black px-6 py-3 uppercase tracking-[0.25em] text-xs hover:bg-white/90 transition"
                  >
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
