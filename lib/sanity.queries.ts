import { client } from "@/app/sanity";
import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY =
  defineQuery(`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  mainImage,
  "slug": slug.current
}`);

export const PROJECT_BY_SLUG_QUERY =
  defineQuery(`*[_type == "project" && slug.current == $slug][0] {
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
  heroImage
}`);

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0] {
  copyright,
  instagram,
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

export const getProjects = () => client.fetch(PROJECTS_QUERY);
export const getProjectBySlug = (slug: string) =>client.fetch(PROJECT_BY_SLUG_QUERY);
export const getHeroData = () => client.fetch(HERO_QUERY);
export const getSettings = () => client.fetch(SETTINGS_QUERY);
export const getAboutData = () => client.fetch(ABOUT_QUERY);
export const getContactData = () => client.fetch(CONTACT_QUERY);