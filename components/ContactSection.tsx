"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import type {
  CONTACT_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
} from "@/lib/sanity.types";
import AvailabilityCalendar from "./AvailabilityCalendar";

// Rozšírenie typu pre Sanity dáta
type ExtendedContactContent = CONTACT_QUERY_RESULT & {
  title?: string | null;
  text?: string | null;
  submitButtonText?: string | null;
  blockedDates?: string[];
};

interface ContactSectionProps {
  content: ExtendedContactContent;
  settings: SETTINGS_QUERY_RESULT;
}

type Status = null | "ok" | "err";

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  location: string;
  date: string;
  message: string;
};

export default function ContactSection({
  content,
  settings,
}: ContactSectionProps) {
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status) setStatus(null);
  };

  const isFormInvalid: boolean =
    formData.name.trim().length < 2 ||
    !formData.email.includes("@") ||
    formData.message.trim().length < 5;

  const title = content?.title ?? "Poďme spolu \n niečo urobiť";
  const text =
    content?.text ??
    "Máte nápad na fotenie alebo otázky ohľadom spolupráce? Napíšte mi prosím";
  const btnText = content?.submitButtonText ?? "Odoslať";
  const blockedDates = content?.blockedDates ?? [];

  const fields: {
    label: string;
    name: keyof Omit<FormDataType, "date" | "message">;
    type: string;
    placeholder: string;
  }[] = [
    { label: "Meno *", name: "name", type: "text", placeholder: "Vaše meno" },
    {
      label: "Email *",
      name: "email",
      type: "email",
      placeholder: "vasemail@email.com",
    },
    { label: "Telefón", name: "phone", type: "tel", placeholder: "+421 ..." },
    {
      label: "Miesto fotenia",
      name: "location",
      type: "text",
      placeholder: "Bratislava, Praha...",
    },
  ];

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
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
    <section
      id="kontakt"
      className="bg-black text-white py-24 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Ľavá strana */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic whitespace-pre-line">
                {title}
              </h2>
              <p className="mt-6 text-zinc-400 font-light leading-relaxed max-w-sm">
                {text}
              </p>
            </div>

            <div className="space-y-10">
              <div className="group text-left">
                <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-1 font-bold">
                  E-mail
                </p>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-xl font-light hover:text-zinc-400 transition-colors"
                >
                  {settings.email}
                </a>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-bold">
                  Sledujte ma
                </p>
                <div className="flex flex-wrap gap-3">
                  {settings.instagram && (
                    <SocialLink href={settings.instagram} label="Instagram" />
                  )}
                  {settings.facebook && (
                    <SocialLink href={settings.facebook} label="Facebook" />
                  )}
                  {settings.youtube && (
                    <SocialLink href={settings.youtube} label="YouTube" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pravá strana (Formulár) */}
          <div className="lg:col-span-7 bg-zinc-900/30 p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 text-left"
            >
              {fields.map((f) => (
                <div key={f.name} className="relative">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-bold italic">
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    className="mt-2 w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-colors placeholder:text-zinc-800 text-sm font-light"
                    type={f.type}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}

              <div className="md:col-span-2 text-left">
                <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-bold italic">
                  Preferovaný dátum fotenia
                </label>
                <div className="mt-4">
                  <AvailabilityCalendar
                    selectedDate={formData.date}
                    blockedDates={blockedDates}
                    onSelect={(ymd) => {
                      setFormData((prev) => ({ ...prev, date: ymd }));
                      if (status) setStatus(null);
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-2 text-left">
                <label className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 font-bold italic">
                  Vaša správa *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-colors placeholder:text-zinc-800 text-sm font-light min-h-[120px] resize-none"
                  placeholder="Napíšte mi viac o vašej predstave..."
                />
              </div>

              <div className="md:col-span-2 pt-6 flex flex-col items-center md:items-start gap-6">
                <button
                  type="submit"
                  disabled={loading || isFormInvalid}
                  className={`relative group w-full md:w-auto px-12 py-4 uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-500 rounded-full border ${
                    isFormInvalid || loading
                      ? "bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed"
                      : "bg-white border-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <span className="relative z-10">
                    {loading ? "Odosielam..." : btnText}
                  </span>
                  {!isFormInvalid && !loading && (
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
                      →
                    </span>
                  )}
                </button>

                <div className="h-6 w-full text-center md:text-left">
                  {status === "ok" && (
                    <p className="text-green-400 text-[10px] uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                      <span className="w-4 h-4 rounded-full border border-green-400/30 flex items-center justify-center text-[8px]">
                        ✓
                      </span>
                      Doručené. Ozvem sa čoskoro.
                    </p>
                  )}
                  {status === "err" && (
                    <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold">
                      ! Chyba pri odosielaní. Skúste to znova.
                    </p>
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

// Pomocný malý komponent pre linky sociálnych sietí
function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-5 py-2 border border-white/10 rounded-full text-[10px] tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300 font-medium"
    >
      {label}
    </a>
  );
}
