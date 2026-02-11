import { client } from "@/app/sanity";
import { Project } from "./types";

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    mainImage,
    "slug": slug.current
  }`;
  
  return await client.fetch(query);
}

export async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    description,
    mainImage,
    gallery,
    "slug": slug.current
  }`;

  return await client.fetch(query, { slug });
}