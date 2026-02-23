import { getProjectsByCategory } from "@/lib/sanity.queries";
import PortfolioClient from "@/components/PortfolioClient";

export const dynamic = "force-dynamic";

interface SanityImage {
  asset?: {
    _ref: string;
    _type: string;
  };
  _type: 'image';
}

interface Project {
  _id: string;
  title: string;
  mainImage: SanityImage;
  slug: { current: string };
  category?: string;
}

interface CategorizedData {
  [categoryName: string]: Project[];
}

export default async function PortfolioPage() {
  const categorizedProjects = await getProjectsByCategory() as CategorizedData;

  const hasProjects = Object.values(categorizedProjects).some(
    (categoryArray) => Array.isArray(categoryArray) && categoryArray.length > 0
  );

  return (
    <main className="min-h-screen bg-black pt-32 pb-40 text-white">
      <div className="max-w-7xl mx-auto px-8">
        
        <header className="mb-32">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase italic">
            Portfólio
          </h1>
          <div className="w-24 h-[1px] bg-white mt-8" />
        </header>

        {!hasProjects ? (
          <div className="py-20 text-center border-t border-white/5">
            <p className="text-zinc-600 uppercase tracking-[0.3em] text-[10px]">
              V databáze neboli nájdené žiadne projekty.
            </p>
          </div>
        ) : (
          <PortfolioClient categorizedProjects={categorizedProjects} />
        )}
      </div>
    </main>
  );
}