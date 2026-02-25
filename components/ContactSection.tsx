// components/ContactSection.tsx
"use client";

import { useState, ChangeEvent } from "react";
import type { CONTACT_QUERY_RESULT, SETTINGS_QUERY_RESULT } from "@/lib/sanity.types";
import AvailabilityCalendar from "./AvailabilityCalendar";

interface ContactSectionProps {
  content: CONTACT_QUERY_RESULT;
  settings: SETTINGS_QUERY_RESULT;
}

type Status = null | "ok" | "err";

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  location: string;
  date: string;    // YYYY-MM-DD...
  message: string;
};

export default function ContactSection({ content, settings }: ContactSectionProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    location: "",
    date: "",
    message: "",
  });

  if (!settings) return null;

  const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status) setStatus(null);
  };

  const isFormInvalid: boolean =
      formData.name.trim().length < 2 ||
      !formData.email.includes("@") ||
      formData.message.trim().length < 5;

  const title: string = (content as any)?.title || "Poďme spolu \n niečo urobiť";
  const text: string =
      (content as any)?.text ||
      "Máte nápad na fotenie alebo otázky ohľadom spolupráce? Napíšte mi prosím";
  const btnText: string = (content as any)?.submitButtonText || "Odoslať";

  const blockedDates: string[] = (content as any)?.blockedDates ?? [];

  const fields: { label: string; name: keyof FormDataType; type: string; placeholder: string }[] = [
    { label: "Meno *", name: "name", type: "text", placeholder: "Vaše meno" },
    { label: "Email *", name: "email", type: "email", placeholder: "vasemail@email.com" },
    { label: "Telefón", name: "phone", type: "tel", placeholder: "+421 ..." },
    { label: "Miesto fotenia", name: "location", type: "text", placeholder: "Bratislava, Praha..." },
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (isFormInvalid) return;

    setLoading(true);
    setStatus(null);

    try {
      const res: Response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("send_failed");

      setStatus("ok");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        date: "",
        message: "",
      });
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
            {/* Ľavá strana */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="title text-4xl md:text-5xl font-bold tracking-tighter uppercase italic whitespace-pre-line">
                  {title}
                </h2>

                <p className="mt-6 text-zinc-400 font-light leading-relaxed max-w-sm">
                  {text}
                </p>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-1">
                    E-mail
                  </p>
                  <a
                      href={`mailto:${settings.email}`}
                      className="text-lg md:text-xl font-light hover:text-zinc-400 transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>

                {settings.instagram && (
                    <div>
                      <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-3">
                        Sociálne siete
                      </p>
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

                {settings.facebook && (
                    <div>
                      <a
                          href={settings.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-2 border border-white/10 rounded-full text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
                      >
                        Facebook
                      </a>
                    </div>
                )}

                {settings.youtube && (
                    <div>
                      <a
                          href={settings.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-2 border border-white/10 rounded-full text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
                      >
                        YouTube
                      </a>
                    </div>
                )}
              </div>
            </div>

            {/* Pravá strana */}
            <div className="lg:col-span-7 bg-zinc-900/30 p-8 md:p-12 rounded-2xl border border-white/5 relative overflow-hidden">
              <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {fields.map((f) => (
                    <div key={f.name} className="relative group">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 transition-colors group-focus-within:text-white">
                        {f.label}
                      </label>
                      <input
                          name={f.name}
                          value={formData[f.name] as string}
                          onChange={handleChange}
                          className="mt-2 w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-colors placeholder:text-zinc-800 text-sm font-light"
                          type={f.type}
                          placeholder={f.placeholder}
                      />
                    </div>
                ))}

                {/* REACT KALENDÁR */}
                <div className="md:col-span-2 relative group">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 transition-colors group-focus-within:text-white">
                    Preferovaný dátum fotenia
                  </label>

                  <div className="mt-3">
                    <AvailabilityCalendar
                        selectedDate={formData.date}
                        blockedDates={blockedDates}
                        onSelect={(ymd) => {
                          setFormData((prev) => ({ ...prev, date: ymd }));
                          if (status) setStatus(null);
                        }}
                    />
                  </div>

                  {formData.date && (
                      <p className="mt-2 text-[11px] text-zinc-400">
                        Vybraný termín: <span className="text-zinc-200">{formData.date}</span>
                      </p>
                  )}
                </div>

                <div className="md:col-span-2 relative group">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 transition-colors group-focus-within:text-white">
                    Vaša správa *
                  </label>
                  <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2 w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-colors placeholder:text-zinc-800 text-sm font-light min-h-[100px] resize-none"
                      placeholder="Napíšte mi viac o vašej predstave..."
                  />
                </div>

                <div className="md:col-span-2 pt-4 flex flex-col items-start gap-4">
                  <button
                      type="submit"
                      disabled={loading || isFormInvalid}
                      className={`relative group overflow-hidden px-12 py-4 uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-500 ${
                          isFormInvalid || loading
                              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"
                              : "bg-white text-black hover:pr-16"
                      }`}
                  >
                  <span className="relative z-10">
                    {loading ? "Odosielam..." : isFormInvalid ? "Neúplné údaje" : btnText}
                  </span>

                    {!isFormInvalid && !loading && (
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      →
                    </span>
                    )}
                  </button>

                  <div className="overflow-hidden w-full">
                    {status === "ok" && (
                        <div className="flex items-center gap-2 text-green-400 text-[11px] uppercase tracking-widest animate-in slide-in-from-left duration-500">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-green-400/30 bg-green-400/10 text-[10px]">
                        ✓
                      </span>
                          Správa bola úspešne odoslaná. Ozvem sa vám!
                        </div>
                    )}

                    {status === "err" && (
                        <div className="flex items-center gap-2 text-red-400 text-[11px] uppercase tracking-widest animate-in slide-in-from-left duration-500">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-red-400/30 bg-red-400/10 text-[10px]">
                        !
                      </span>
                          Chyba pri odosielaní. Skúste to znova neskôr.
                        </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}