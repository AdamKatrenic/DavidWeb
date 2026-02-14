import AboutMePage from "@/components/AboutMePage";
import { getAboutData } from "@/lib/sanity.queries";

export default async function Page() {
  const aboutData = await getAboutData();

  return (
    <main className="bg-black min-h-screen">
      <AboutMePage aboutData={aboutData} />
    </main>
  );
}