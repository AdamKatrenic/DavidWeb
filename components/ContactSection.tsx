"use client";

import { useState } from "react";
import type { CONTACT_QUERY_RESULT, SETTINGS_QUERY_RESULT } from "@/lib/sanity.types";

interface ContactSectionProps {
  content: CONTACT_QUERY_RESULT;
  settings: SETTINGS_QUERY_RESULT;
}

type Status = null | "ok" | "err";

export default function ContactSection({ content, settings }: ContactSectionProps) {
  if (!settings) return null;

  const title: string = content?.title || "Poďme spolu \n niečo vytvoriť";
  const text: string =
      content?.text ||
      "Máte nápad na fotenie alebo otázky ohľadom spolupráce? Napíšte mi a ja sa vám ozvem hneď, ako odložím foťák.";
  const btnText: string = content?.submitButtonText || "Odoslať dopyt";

  const fields: { label: string; name: string; type: string; placeholder: string }[] = [
    { label: "Meno", name: "name", type: "text", placeholder: "Vaše meno" },
    { label: "Email", name: "email", type: "email", placeholder: "vasemail@email.com" },
    { label: "Telefón", name: "phone", type: "tel", placeholder: "+421 ..." },
    { label: "Miesto fotenia", name: "location", type: "text", placeholder: "Bratislava, Praha..." },
  ];

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      location: String(formData.get("location") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("send_failed");

      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  return (
      <section id="kontakt" className="bg-black text-white py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="title text-4xl md:text-5xl font-bold tracking-tighter uppercase italic whitespace-pre-line">
                  {title}
                </h2>
                <p className="text mt-6 text-zinc-400 font-light leading-relaxed max-w-sm">{text}</p>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-1">E-mail</p>
                  <a
                      href={`mailto:${settings.email}`}
                      className="text-lg md:text-xl font-light hover:text-zinc-400 transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>

                {settings.instagram && (
                    <div>
                      <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-3">Sociálne siete</p>
                      <a
                          href={settings.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-2 border border-white/10 rounded-full text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
                      >
                        Instagram
                      </a>
                    </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-900/30 p-8 md:p-12 rounded-2xl border border-white/5">
              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {fields.map((f) => (
                    <div key={f.name} className="relative group">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 transition-colors group-focus-within:text-white">
                        {f.label}
                      </label>
                      <input
                          name={f.name}
                          className="mt-2 w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-colors placeholder:text-zinc-800 text-sm font-light"
                          type={f.type}
                          placeholder={f.placeholder}
                      />
                    </div>
                ))}

                <div className="md:col-span-2 relative group">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 transition-colors group-focus-within:text-white">
                    Vaša správa
                  </label>
                  <textarea
                      name="message"
                      className="mt-2 w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-colors placeholder:text-zinc-800 text-sm font-light min-h-[100px] resize-none"
                      placeholder="Napíšte mi viac o vašej predstave..."
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                      type="submit"
                      disabled={loading}
                      className="submitButton relative group overflow-hidden bg-white text-black px-12 py-4 uppercase tracking-[0.2em] text-[10px] font-bold transition-all hover:pr-16 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">{loading ? "Odosielam..." : btnText}</span>
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    →
                  </span>
                  </button>

                  {status === "ok" && <p className="text-sm text-zinc-400 mt-3">Odoslané.</p>}
                  {status === "err" && <p className="text-sm text-zinc-400 mt-3">Nepodarilo sa odoslať.</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
