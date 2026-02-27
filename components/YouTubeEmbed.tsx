"use client";

import { JSX } from "react";

interface YouTubeEmbedProps {
  url: string;
  caption?: string;
}

/**
 * Vylepšená funkcia na extrakciu ID videa.
 * Podporuje:
 * - Klasické: youtube.com/watch?v=ID
 * - Skrátené: youtu.be/ID
 * - Shorts: youtube.com/shorts/ID
 * - Embed: youtube.com/embed/ID
 */
const getYouTubeID = (url: string): string | null => {
  // Tento regex pokrýva aj /shorts/ aj bežné formáty
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[1] && match[1].length === 11) ? match[1] : null;
};

export default function YouTubeEmbed({ url, caption }: YouTubeEmbedProps): JSX.Element {
  const videoId: string | null = getYouTubeID(url);

  if (!videoId) {
    return (
      <div className="w-full bg-zinc-900/50 border border-dashed border-white/10 rounded-2xl p-8 text-center text-zinc-500 text-sm">
        Neplatný YouTube alebo Shorts odkaz
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 my-8">
      {/* Kontajner pre video (16:9) */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black group">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          // YouTube embed funguje pre Shorts rovnako ako pre bežné videá cez /embed/ ID
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      {/* Popis pod videom */}
      {caption && (
        <p className="text-center text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-medium italic">
          {caption}
        </p>
      )}
    </div>
  );
}