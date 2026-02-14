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
  email?: string;
}

export interface AboutData {
  title?: string;
  // Pre obrázok použijeme objekt s neznámymi vlastnosťami (unknown je bezpečnejšie ako any)
  aboutImage?: Record<string, unknown>; 
  // Description definujeme ako pole objektov (pre PortableText) alebo čistý string
  description?: Record<string, unknown>[] | string; 
}