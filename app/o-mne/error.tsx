'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Chyba na stránke O mne:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-white uppercase">
          Momentálne sa nám nepodarilo <br /> načítať tento príbeh
        </h2>
        
        <p className="text-zinc-500 max-w-md mx-auto text-sm leading-relaxed">
          Niekedy sa aj ten najlepší záber nepodarí na prvýkrát. Skúsme to znova.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-white text-black text-xs tracking-widest uppercase hover:bg-zinc-200 transition-all font-medium"
          >
            Skúsiť znova
          </button>
          
          <Link
            href="/"
            className="px-8 py-3 border border-white/20 text-white text-xs tracking-widest uppercase hover:bg-white/10 transition-all font-medium"
          >
            Späť domov
          </Link>
        </div>
      </div>
    </div>
  );
}