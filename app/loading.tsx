export default function Loading() {
  return (
    <div className="min-h-screen bg-black px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Simulácia Hero sekcie */}
        <div className="space-y-4 mb-24">
          <div className="h-12 w-2/3 bg-zinc-900 animate-pulse rounded-sm" />
          <div className="h-4 w-1/3 bg-zinc-900 animate-pulse rounded-sm" />
        </div>

        {/* Simulácia Gridu s fotkami (Portfólio) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[3/4] w-full bg-zinc-900 animate-pulse rounded-sm" />
              <div className="h-3 w-1/2 bg-zinc-900 animate-pulse rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}