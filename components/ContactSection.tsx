export default function ContactSection() {
  const fields = [
    { label: 'Meno', name: 'name', type: 'text' },
    { label: 'Telefón', name: 'phone', type: 'tel' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Dátum', name: 'date', type: 'date' },
    { label: 'Miesto', name: 'location', type: 'text' },
  ];

  return (
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
                <div className="text-xl tracking-[0.25em] uppercase text-white/90">E-mail</div>
                <div className="mt-2 text-sm md:text-base text-white">davidpilar@gmail.com</div>
              </div>
              <div className="pt-2 flex items-center gap-6">
                <a className="text-sm md:text-base font-medium hover:underline text-[#1877F2]" href="#">Facebook</a>
                <a className="text-sm md:text-base font-medium hover:underline" href="#">
                  <span className="bg-gradient-to-r from-[#FEDA77] via-[#FD1D1D] to-[#833AB4] text-transparent bg-clip-text font-bold">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 md:p-8">
            <form className="space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-xs tracking-[0.25em] uppercase text-white/60">{f.label}</label>
                  <input className="mt-2 w-full bg-white text-black px-4 py-3 outline-none" type={f.type} />
                </div>
              ))}
              <div>
                <label className="block text-xs tracking-[0.25em] uppercase text-white/60">Správa</label>
                <textarea className="mt-2 w-full bg-white text-black px-4 py-3 outline-none min-h-[140px]" />
              </div>
              <button className="w-48 bg-white text-black px-6 py-3 uppercase tracking-[0.25em] text-xs hover:bg-gray-200 transition">
                Odoslať
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}