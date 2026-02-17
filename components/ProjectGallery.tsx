"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { urlFor } from "@/app/sanity";

interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  _key?: string;
}

interface ProjectGalleryProps {
  gallery: SanityImage[];
  title: string;
}

export default function ProjectGallery({ gallery, title }: ProjectGalleryProps) {
  const [index, setIndex] = useState(-1);

  // Príprava slidov pre lightbox bez 'any'
  const slides = gallery.map((image) => ({
    src: urlFor(image).width(3000).url(), // Plná kvalita pre detail
  }));

  return (
    <>
      <div className="grid grid-cols-1 gap-12 md:gap-24">
        {gallery.map((image, i) => (
          <div 
            key={image._key || image.asset._ref} 
            className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-zinc-900 cursor-zoom-in group"
            onClick={() => setIndex(i)}
          >
            <Image
              src={urlFor(image).width(2000).url()}
              alt={`${title} - fotka ${i + 1}`}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Jemný overlay pri hoveri */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        // Môžeš pridať animáciu
        animation={{ fade: 500 }}
      />
    </>
  );
}