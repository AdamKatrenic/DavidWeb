import Hero from "@/components/Hero";
import ContactSection from "@/components/ContactSection";
import AboutShort from "@/components/AboutShort";
import { getHeroData, getSettings, getContactData, getAboutShortData } from "@/lib/sanity.queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [heroData, settingsData, contactData, aboutShortData] = await Promise.all([
    getHeroData(),
    getSettings(),
    getContactData(),
    getAboutShortData(),
  ]);

  return (
    <main className="min-h-screen bg-black">
      <Hero data={heroData} />

      <AboutShort data={aboutShortData} />

      <section id="kontakt">
        <ContactSection content={contactData} settings={settingsData} />
      </section>
    </main>
  );
}