"use client";

import Image from 'next/image';
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/app/sanity";

interface SanityImage {
  asset?: {
    _ref: string;
    _type: string;
  };
  _type: 'image';
}

interface Project {
  _id: string;
  title: string;
  mainImage: SanityImage;
  slug: { 
    current: string 
  };
  category?: string;
}

interface CategorizedProjects {
  [categoryTitle: string]: Project[];
}

export default function PortfolioClient({ categorizedProjects }: { categorizedProjects: CategorizedProjects }) {
  return (
    <div className="space-y-40">
      {Object.entries(categorizedProjects).map(([categoryTitle, projects]) => {
        if (!projects || projects.length === 0) return null;

        return (
          <motion.section 
            key={categoryTitle}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* STICKY HEADER */}
            <div className="sticky top-0 z-30 bg-black/60 backdrop-blur-md py-8 mb-12 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-6 overflow-hidden">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase italic shrink-0 text-zinc-200">
                  {categoryTitle}
                </h2>
                <div className="h-[1px] w-32 bg-zinc-800" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                Súbor / {projects.length.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={`/portfolio/${project.slug.current}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5">
                      {project.mainImage.asset && (
                        <Image 
                          src={urlFor(project.mainImage).width(800).height(1000).url()} 
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="mt-8 flex justify-between items-center">
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-400 group-hover:text-white transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-[9px] text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase tracking-widest">
                        Detail
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}