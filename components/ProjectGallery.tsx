"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox, { Slide } from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import { urlFor } from "@/app/sanity";
import YouTubeEmbed from "./YouTubeEmbed";

// 1. Presná definícia typov zo Sanity
interface SanityImage {
  _type: "image";
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface SanityVideo {
  _type: "youtubeVideo";
  _key: string;
  url: string;
  caption?: string;
}

// Union type pre položky v galérii
type GalleryItem = SanityImage | SanityVideo;

interface ProjectGalleryProps {
  gallery: GalleryItem[];
  title: string;
}

export default function ProjectGallery({ gallery, title }: ProjectGalleryProps) {
  const [index, setIndex] = useState(-1);

  // 2. Bezpečné mapovanie slidov pre Lightbox
  // Používame typ Slide z knižnice, aby sme mali istotu
  const slides: Slide[] = gallery.map((item) => {
    if (item._type === "youtubeVideo") {
      return {
        type: "video" as const,
        width: 1280,
        height: 720,
        poster: "", // Tu by sa dal pridať náhľadový obrázok, ak by sme ho mali
        sources: [
          {
            src: item.url,
            type: "video/youtube",
          },
        ],
      };
    }

    // Pre obrázky musíme vrátiť štruktúru, ktorú Lightbox pozná
    return {
      type: "image" as const,
      src: urlFor(item).width(3000).url(),
      alt: title,
    };
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-12 md:gap-24">
        {gallery.map((item, i) => {
          // RENDER PRE VIDEO
          if (item._type === "youtubeVideo") {
            return (
              <div key={item._key} className="w-full group">
                <YouTubeEmbed url={item.url} caption={item.caption} />
                <div className="flex justify-center">
                  <button
                    onClick={() => setIndex(i)}
                    className="mt-2 text-[9px] uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-4 h-[1px] bg-zinc-800 group-hover:w-8 group-hover:bg-white transition-all" />
                    Fullscreen režim
                  </button>
                </div>
              </div>
            );
          }

          // RENDER PRE FOTKU
          // Tu používame type guard, TS už vie, že ak to nie je video, je to SanityImage
          return (
            <div
              key={item._key || item.asset._ref}
              className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-zinc-950 cursor-zoom-in group border border-white/5"
              onClick={() => setIndex(i)}
            >
              <Image
                src={urlFor(item).width(2000).url()}
                alt={`${title} - fotka ${i + 1}`}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority={i < 2} // Prvé dve fotky načítame prioritne
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          );
        })}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Video]}
        animation={{ fade: 600 }}
        // Nastavenia pre video plugin
        video={{
          autoPlay: true,
          controls: true,
        }}
      />
    </>
  );
}