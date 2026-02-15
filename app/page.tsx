import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import ContactSection from "@/components/ContactSection";
import { getHeroData, getProjects, getSettings } from "@/lib/sanity.queries";

export default async function Home() {
  const [projects, heroData] = await Promise.all([
    getProjects(),
    getHeroData(),
    getSettings(),
  ]);

  return (
    <main className="min-h-screen bg-black">
      <Hero
        title={heroData?.title}
        welcomeText={heroData?.welcomeText}
        heroImage={heroData?.heroImage}
      />

      <div id="portfolio">
        <PortfolioGrid projects={projects} />
      </div>

      <ContactSection />
    </main>
  );
}
