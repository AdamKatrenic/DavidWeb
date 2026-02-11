import Link from "next/link";

export default function Hero() {
  const navItems = [
    { name: 'DOMOV', href: '/' },
    { name: 'O MNE', href: '/about' },
    { name: 'PORTFOLIO', href: '/portfolio' },
    { name: 'FAQ', href: '/faq' },
    { name: 'BLOG', href: '/blog' },
    { name: 'KONTAKT', href: '/contact' },
  ];

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="z-10 text-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">
          David Pilar
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mt-4 tracking-[0.2em] uppercase">
          Visual Storyteller / Photographer
        </p>

        <nav className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-10">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="nav-link text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors">
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
    </section>
  );
}