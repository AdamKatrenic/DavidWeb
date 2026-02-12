import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import ContactSection from "@/components/ContactSection";
import { getHeroPhoto, getProjects } from "@/lib/sanity.queries";

export default async function Home() {
  const [projects, heroData] = await Promise.all([
    getProjects(),
    getHeroPhoto() 
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
      
      <footer className="py-10 text-center text-xs tracking-[0.25em] text-white/40 uppercase">
        © {new Date().getFullYear()} David Pilar Photography
      </footer>
    </main>
  );
}