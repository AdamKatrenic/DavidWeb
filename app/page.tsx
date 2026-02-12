import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import ContactSection from "@/components/ContactSection";
import { getHeroData, getProjects, getSettings } from "@/lib/sanity.queries";
import Footer from "@/components/Footer";

export default async function Home() {
  const [projects, heroData, settings]= await Promise.all([
    getProjects(),
    getHeroData(),
    getSettings(), 
  ]);

  return (
    <main className="min-h-screen bg-black">
      <Hero 
        title= {heroData?.title}
        welcomeText={heroData?.welcomeText}
        heroImage={heroData?.heroImage}
      /> 
      
      <PortfolioGrid projects={projects} />
      <ContactSection />
      
      <Footer 
        copyright={settings?.copyright} 
        instagram={settings?.instagram} 
      />
    </main>
  );
}