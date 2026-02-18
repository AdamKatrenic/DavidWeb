import AboutMePage from "@/components/AboutMePage";
import { getAboutData } from "@/lib/sanity.queries";
import { ABOUT_QUERY_RESULT } from "@/lib/sanity.types";

export default async function Page() {
  const aboutData: ABOUT_QUERY_RESULT = await getAboutData();

  return (
    <main className="bg-black min-h-screen">
      <AboutMePage aboutData={aboutData} />
    </main>
  );
}