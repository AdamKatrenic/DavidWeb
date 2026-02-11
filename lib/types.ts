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