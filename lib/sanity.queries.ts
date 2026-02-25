import { client } from "@/app/sanity";
import { defineQuery } from "next-sanity";

export const PROJECTS_BY_CATEGORY_QUERY = defineQuery(`{
  "Svadby": *[_type == "project" && category == "wedding"] | order(_createdAt desc) [0...5] {
    _id, title, mainImage, slug, category
  },
  "Stužkové": *[_type == "project" && category == "concert"] | order(_createdAt desc) [0...5] {
    _id, title, mainImage, slug, category
  },
  "Videoklipy": *[_type == "project" && category == "portrait"] | order(_createdAt desc) [0...5] {
    _id, title, mainImage, slug, category
  },
  "Dokumenty": *[_type == "project" && category == "landscape"] | order(_createdAt desc) [0...5] {
    _id, title, mainImage, slug, category
  },
  "Ostatné": *[_type == "project" && !defined(category)] | order(_createdAt desc) [0...5] {
    _id, title, mainImage, slug, category
  }
}`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  description,
  mainImage,
  gallery,
  "slug": slug.current
}`);

export const HERO_QUERY = defineQuery(`*[_type == "homePage"][0] {
  title,
  welcomeText,
  heroImage,
  featuredCategories[] {
    title,
    subtitle,
    slug,
    "imageUrl": backgroundImage.asset->url
  }
}`);

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0] {
  copyright,
  instagram,
  facebook,
  youtube,
  email
}`);

export const ABOUT_QUERY = defineQuery(`*[_type == "aboutSection"][0] {
  title,
  aboutImage,
  description
}`);

export const CONTACT_QUERY = defineQuery(`*[_id == "contactSectionV2"][0] {
  title,
  text,
  submitButtonText
}`);

export const NAVBAR_QUERY = defineQuery(`*[_type == "navbar"][0] {
  title,
  subtitle
}`);

export const ABOUT_SHORT_QUERY = defineQuery(`*[_id == "aboutShort"][0] {
  overline,
  title,
  text,
  image,
  ctaText
}`);

export const projectsByCategoryQuery = defineQuery(`*[_type == "project" && category == $category] | order(_createdAt desc) {
  _id,
  title,
  mainImage,
  slug,
  category
}`);

export const getProjectsBySpecificCategory = (category: string) => 
  client.fetch(projectsByCategoryQuery, { category });

export const getProjectsByCategory = () => client.fetch(PROJECTS_BY_CATEGORY_QUERY);
export const getProjectBySlug = (slug: string) => client.fetch(PROJECT_BY_SLUG_QUERY, { slug });
export const getHeroData = () => client.fetch(HERO_QUERY);
export const getSettings = () => client.fetch(SETTINGS_QUERY);
export const getAboutData = () => client.fetch(ABOUT_QUERY);
export const getContactData = () => client.fetch(CONTACT_QUERY);
export const getNavbar = () => client.fetch(NAVBAR_QUERY);
export const getAboutShortData = () => client.fetch(ABOUT_SHORT_QUERY);
