import Hero from "@/components/Hero";
import ContactSection from "@/components/ContactSection";
import AboutShort from "@/components/AboutShort";
import {getHeroData, getSettings, getContactData, getAboutShortData} from "@/lib/sanity.queries";
import CategorySection from "@/components/CategorySection";

interface FeaturedCategory {
  title: string;
  subtitle: string;
  slug: string;
  imageUrl?: string;
}

interface HeroData {
  title: string;
  welcomeText?: string;
  heroImage?: {
    asset?: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  featuredCategories?: FeaturedCategory[];
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const rawHeroData = await getHeroData();
  const settingsData = await getSettings();
  const contactData = await getContactData();
  const aboutShortData = await getAboutShortData();
  const heroData = rawHeroData as HeroData;

  return (
    <main className="min-h-screen bg-black">
      <Hero data={rawHeroData} />

      <AboutShort data={aboutShortData} />

      {/* Dynamické kategórie */}
      {heroData?.featuredCategories?.map((category) => (
        <CategorySection
          key={category.slug}
          title={category.title}
          slug={category.slug}
          subtitle={category.subtitle}
          imageUrl={category.imageUrl}
        />
      ))}

      <section id="kontakt">
        <ContactSection content={contactData} settings={settingsData} />
      </section>
    </main>
  );
}