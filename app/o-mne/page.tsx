import Hero from "@/components/Hero";
import AboutMePage from "@/components/AboutMePage";
import ContactSection from "@/components/ContactSection";
import { getHeroData } from "@/lib/sanity.queries";

export default async function Page() {
    const heroData = await getHeroData();

    return (
        <main className="min-h-screen bg-black">
            <Hero
                title={heroData?.title}
                welcomeText={heroData?.welcomeText}
                heroImage={heroData?.heroImage}
            />

            <AboutMePage />

            <ContactSection />
        </main>
    );
}
