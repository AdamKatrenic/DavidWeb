import Image from "next/image";

export default function AboutMePage() {
    return (
        <section className="bg-black text-white border-t border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="grid md:grid-cols-2 gap-10 items-stretch">
                    {/* FOTO vľavo */}
                    <div className="relative overflow-hidden border border-white/10 bg-zinc-950/60 h-[420px] md:h-[640px]">
                        <Image
                            src="/o-mne.jpg"
                            alt="O mne"
                            fill
                            priority={false}
                            className="object-cover object-center"
                        />

                        {/* jemný gradient aby to ladilo s tmou */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
                    </div>

                    {/* TEXT vpravo - vysoký rámček */}
                    <div className="border border-white/10 bg-black/55 backdrop-blur-sm p-10 h-[420px] md:h-[640px] flex flex-col justify-center">
                        <div className="space-y-6">
                            <div className="tracking-[0.35em] text-xs text-white/80 uppercase">
                                DAVID PILLAR
                            </div>

                            <p className="text-base md:text-lg leading-relaxed text-zinc-200">
                                Ahoj, volám sa David a fotografiu beriem ako spôsob, ako zachytiť moment
                                tak, aby ho bolo cítiť aj o roky neskôr. Nie je to len o obraze — je to o
                                atmosfére, ľuďoch a príbehu.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed text-zinc-200">
                                Najradšej fotím prirodzene a čisto. Bez zbytočného „hraného“ pocitu.
                                Chcem, aby si sa pri fotení cítil uvoľnene a aby výsledok vyzeral
                                nadčasovo.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed text-zinc-200">
                                Pracujem na svadbách, portrétoch aj komerčných veciach — podľa toho, čo
                                práve potrebuješ. Keď sa mi ozveš, dohodneme štýl, predstavu a celé to
                                nastavíme tak, aby to dávalo zmysel.
                            </p>

                            <p className="text-base md:text-lg leading-relaxed text-zinc-200">
                                Som zo Slovenska, ale nemám problém vycestovať. Dôležité je, aby výsledok
                                pôsobil autenticky a aby si sa v tom našiel.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
