import { MetadataRoute } from 'next';
import { createClient } from 'next-sanity';

// Definujeme rozhranie pre výsledok zo Sanity
interface CategoryResult {
  slug: string;
}

const client = createClient({
  projectId: 'emnkhutw',
  dataset: "production",
  apiVersion: "2024-03-05",
  useCdn: false,
});

async function getCategorySlugs(): Promise<string[]> {
  try {
    // GROQ query vráti pole objektov s vlastnosťou slug
    const query = `*[_type == "category"]{ "slug": slug.current }`;
    const categories = await client.fetch<CategoryResult[]>(query);
    
    return categories.map((cat) => cat.slug);
  } catch (e) {
    console.error("Sitemap fetch error:", e);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://davidpillar.sk';
  const categorySlugs = await getCategorySlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { 
      url: baseUrl, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 1 
    },
    { 
      url: `${baseUrl}/portfolio`, 
      lastModified: new Date(), 
      changeFrequency: 'weekly', 
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/o-mne`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.7 
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages];
}