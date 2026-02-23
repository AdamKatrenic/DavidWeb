export interface SanityImage {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
    alt?: string;
}

export interface Project {
    _id: string;
    title: string;
    slug: string;
    mainImage: SanityImage;
    description?: string;
    gallery?: SanityImage[];
}

export interface HeroData {
  title?: string;
  welcomeText?: string;
  heroImage: SanityImage;
}

export interface SiteSettings {
  copyright?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  email?: string;
}

export interface AboutData {
  title: string; 
  aboutImage?: Record<string, unknown>;
  description?: Record<string, unknown>[] | string;
}