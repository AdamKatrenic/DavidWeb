import Link from "next/link";

export const metadata = {
  title: "Ochrana osobných údajov",
  robots: "noindex, follow",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Späť na web - výraznejší hover */}
        <Link 
          href="/" 
          className="text-[11px] uppercase tracking-[0.4em] text-zinc-500 hover:text-emerald-500 transition-all flex items-center gap-3 mb-20 group font-bold"
        >
          <span className="text-xl leading-none group-hover:-translate-x-2 transition-transform">‹</span> 
          Späť na hlavnú stránku
        </Link>

        <header className="mb-24 border-b border-white/10 pb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.85]">
            Ochrana <br /> 
            <span className="text-zinc-800">osobných</span> <br />
            údajov
          </h1>
          <p className="mt-10 text-xl md:text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed">
            Transparentnosť je základom každej dobrej spolupráce. Tu je prehľad toho, ako narábam s vašimi dátami.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          
          {/* 1. KTO SOM */}
          <section className="space-y-6">
            <h2 className="text-[12px] tracking-[0.3em] text-emerald-500 uppercase font-black italic">
              01 / Prevádzkovateľ
            </h2>
            <div className="space-y-2">
              <p className="text-2xl font-bold uppercase tracking-tight">Dávid [Priezvisko]</p>
              <p className="text-zinc-500 font-mono text-sm tracking-widest">[Váš e-mail]</p>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Fotím ako súkromná osoba. Vaše údaje sú u mňa v bezpečí a nikdy ich nepredávam tretím stranám.
            </p>
          </section>

          {/* 2. ČO ZBIERAM */}
          <section className="space-y-6 border-l border-white/5 pl-8">
            <h2 className="text-[12px] tracking-[0.3em] text-emerald-500 uppercase font-black italic">
              02 / Dáta
            </h2>
            <p className="text-lg text-zinc-200 font-medium leading-snug">
              Meno, Email, Telefón a detaily vašej predstavy o fotení.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Spracúvam len to, čo mi sami napíšete do formulára. Nič viac, nič menej. Web taktiež využíva nevyhnutné technické súbory cookies pre správne fungovanie stránky.
            </p>
          </section>

          {/* 3. ÚČEL */}
          <section className="space-y-6">
            <h2 className="text-[12px] tracking-[0.3em] text-emerald-500 uppercase font-black italic">
              03 / Prečo?
            </h2>
            <p className="text-lg text-zinc-200 font-medium leading-snug text-balance">
              Aby sme si mohli dohodnúť termín, miesto a doladiť vizuálny štýl fotenia.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Údaje slúžia výhradne na komunikáciu ohľadom vašej objednávky a následnú realizáciu projektu.
            </p>
          </section>

          {/* 4. VAŠE PRÁVA */}
          <section className="space-y-6 border-l border-white/5 pl-8">
            <h2 className="text-[12px] tracking-[0.3em] text-emerald-500 uppercase font-black italic">
              04 / Kontrola
            </h2>
            <p className="text-lg text-zinc-200 font-medium leading-snug">
              Máte právo na prístup k údajom alebo ich okamžité vymazanie.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Stačí jedna správa na môj email a vaše údaje z mojej databázy/mailu zmiznú do 24 hodín.
            </p>
          </section>

        </div>

        <footer className="mt-32 pt-12 border-t border-white/5 flex justify-between items-center">
          <div className="text-[10px] text-zinc-800 uppercase tracking-[0.5em] font-bold">
            Last Update / 03-2026
          </div>
          <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block" />
          <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
            © Dávid Photography
          </div>
        </footer>
      </div>
    </main>
  );
}