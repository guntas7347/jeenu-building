export default function LoadingListings() {
  return (
    <main className="pt-32 pb-16 max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Filter Sidebar Skeleton */}
        <aside className="w-full lg:w-72 lg:sticky lg:top-28 space-y-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm animate-pulse">
          <div className="h-6 w-24 bg-slate-200 rounded-md mb-8"></div>

          {/* Mock Filter Inputs */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2.5">
              <div className="h-3 w-20 bg-slate-200 rounded"></div>
              <div className="h-12 w-full bg-slate-100 rounded-xl"></div>
            </div>
          ))}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="h-14 w-full bg-slate-200 rounded-2xl"></div>
          </div>
        </aside>

        {/* Listings Section Skeleton */}
        <section className="flex-1 w-full">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-pulse">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-slate-200 rounded-md"></div>
              <div className="h-4 w-32 bg-slate-100 rounded"></div>
            </div>
            <div className="h-10 w-40 bg-slate-100 rounded-xl"></div>
          </div>

          {/* Grid of Card Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Generate 6 skeleton cards */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-pulse"
              >
                {/* Image Area Skeleton */}
                <div className="aspect-[4/3] bg-slate-200 w-full"></div>

                {/* Content Area Skeleton */}
                <div className="p-6 space-y-4">
                  {/* Price & Badge */}
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-24 bg-slate-200 rounded"></div>
                    <div className="h-5 w-16 bg-slate-100 rounded-lg"></div>
                  </div>

                  {/* Title */}
                  <div className="h-5 w-3/4 bg-slate-200 rounded"></div>

                  {/* Location */}
                  <div className="h-4 w-1/2 bg-slate-100 rounded"></div>

                  {/* Bottom Stats (Bed/Bath/Sqft) */}
                  <div className="pt-4 border-t border-slate-50">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-4 bg-slate-200 rounded"></div>
                      <div className="h-4 bg-slate-100 rounded"></div>
                      <div className="h-4 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
