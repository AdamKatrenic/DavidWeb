import Hero from "@/components/Hero";
import ContactSection from "@/components/ContactSection";
import { getHeroData, getSettings, getContactData } from "@/lib/sanity.queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [heroData, settingsData, contactData] = await Promise.all([
    getHeroData(),
    getSettings(),
    getContactData(),
  ]);

  return (
    <main className="min-h-screen bg-black">
      <Hero data={heroData} />

      <section id="kontakt">
        <ContactSection content={contactData} settings={settingsData} />
      </section>
    </main>
  );
}