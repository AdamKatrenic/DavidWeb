import { client } from "@/app/sanity";
import { HeroData, Project, SiteSettings, AboutData } from "./types";

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

export async function getHeroData(): Promise<HeroData | null>{
  const query = `*[_type == "homePage"][0] {
    title,
    welcomeText,
    "heroImage": {
      "asset": heroImage.asset,
      "alt": heroImage.alt,
      "hotspot": heroImage.hotspot
    }
  }`;
  return await client.fetch(query);
}

export async function getSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    copyright,
    instagram,
    email
  }`;
  return await client.fetch(query)
}

export async function getAboutData(): Promise<AboutData | null> {
  const query = `*[_type == "aboutSection"][0] {
    title,
    aboutImage,
    description
  }`;
  return await client.fetch(query);
}