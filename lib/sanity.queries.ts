// lib/sanity.queries.ts
import { defineQuery } from "next-sanity";
import { client } from "@/app/sanity";

// -------------------------
// PROJECTS
// -------------------------
export const PROJECTS_QUERY = defineQuery(`
*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  mainImage,
  "slug": slug.current
}
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  description,
  mainImage,
  gallery,
  "slug": slug.current
}
`);

// -------------------------
// HERO / SETTINGS / ABOUT
// -------------------------
export const HERO_QUERY = defineQuery(`
*[_type == "homePage"][0] {
  title,
  welcomeText,
  heroImage
}
`);

export const SETTINGS_QUERY = defineQuery(`
*[_type == "siteSettings"][0] {
  copyright,
  instagram,
  facebook,
  youtube,
  email
}
`);

export const ABOUT_QUERY = defineQuery(`
*[_type == "aboutSection"][0] {
  title,
  aboutImage,
  description
}
`);

// -------------------------
// CONTACT ✅ berie singleton _id contactSectionV2 + blockedDates
// -------------------------
export const CONTACT_QUERY = defineQuery(`
*[_id == "contactSectionV2"][0]{
  title,
  text,
  submitButtonText,
  blockedDates
}
`);

// -------------------------
// NAVBAR / ABOUT SHORT (singletony)
// -------------------------
export const NAVBAR_QUERY = defineQuery(`
*[_id == "navbar"][0]{
  title,
  subtitle
}
`);

export const ABOUT_SHORT_QUERY = defineQuery(`
*[_id == "aboutShort"][0]{
  overline,
  title,
  text,
  image,
  ctaText
}
`);

// -------------------------
// EXPORT FUNKCIE (tvoje importy)
// -------------------------
export const getProjectsByCategory = () => client.fetch(PROJECTS_QUERY);
export const getProjectBySlug = (slug: string) => client.fetch(PROJECT_BY_SLUG_QUERY, { slug });

export const getHeroData = () => client.fetch(HERO_QUERY);

export const getSettings = () => client.fetch(SETTINGS_QUERY);
export const getAboutData = () => client.fetch(ABOUT_QUERY);
export const getContactData = () => client.fetch(CONTACT_QUERY);

export const getNavbar = () => client.fetch(NAVBAR_QUERY);
export const getAboutShortData = () => client.fetch(ABOUT_SHORT_QUERY);