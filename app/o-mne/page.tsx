import AboutMePage from "@/components/AboutMePage";
import { getAboutData } from "@/lib/sanity.queries";
// Importujeme vygenerovaný typ pre výsledok tejto konkrétnej query
import { ABOUT_QUERY_RESULT } from "../../studio/sanity.types";

export default async function Page() {
  // TypeScript teraz vďaka Typegenu vie, že aboutData je typu ABOUT_QUERYResult
  const aboutData: ABOUT_QUERY_RESULT = await getAboutData();

  return (
    <main className="bg-black min-h-screen">
      {/* Ak ti tu AboutMePage hlási chybu, musíš upraviť 
        aj interface vnútri komponentu AboutMePage (viď nižšie).
      */}
      <AboutMePage aboutData={aboutData} />
    </main>
  );
}