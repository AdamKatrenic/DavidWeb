import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import ContactSection from "@/components/ContactSection";
import { getProjects } from "@/lib/sanity.queries";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <PortfolioGrid projects={projects} />
      <ContactSection />
      
      <footer className="py-10 text-center text-xs tracking-[0.25em] text-white/40 uppercase">
        © {new Date().getFullYear()} David Pilar Photography
      </footer>
    </main>
  );
}