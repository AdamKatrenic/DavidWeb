import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "emnkhutw",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Použitie nového pomenovaného exportu
const builder = createImageUrlBuilder(client);

// Otypovanie 'source' zostáva zachované, aby si neprišiel o autocompletion
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}