import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import ContactSection from "@/components/ContactSection";
import { getHeroData, getProjects, getSettings, getContactData  } from "@/lib/sanity.queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, heroData, settingsData, contactData] = await Promise.all([
    getProjects(),
    getHeroData(),
    getSettings(),
    getContactData(), 
  ]);

  return (
    <main className="min-h-screen bg-black">
      <Hero data={heroData} />

      <div id="portfolio">
        <PortfolioGrid projects={projects} />
      </div>

      <ContactSection content={contactData} settings={settingsData} />
    </main>
  );
}