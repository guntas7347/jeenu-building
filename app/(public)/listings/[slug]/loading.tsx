export default function LoadingListingDetails() {
  return (
    <main className="pt-32 pb-16 max-w-7xl mx-auto px-6">
      {/* Top Breadcrumb & Navigation Skeleton */}
      <div className="flex items-center justify-between mb-6 animate-pulse">
        <div className="h-5 w-48 bg-slate-200 rounded"></div>
        <div className="flex gap-3">
          <div className="h-10 w-24 bg-slate-100 rounded-xl"></div>
          <div className="h-10 w-24 bg-slate-100 rounded-xl"></div>
        </div>
      </div>

      {/* Image Gallery Skeleton */}
      <div className="grid grid-cols-12 gap-2 h-[340px] md:h-[480px] rounded-2xl overflow-hidden mb-12 animate-pulse">
        {/* Main large image */}
        <div className="col-span-12 md:col-span-7 bg-slate-200 w-full h-full"></div>
        {/* Side images (Hidden on mobile, just like the real page) */}
        <div className="hidden md:grid col-span-5 grid-rows-2 gap-2">
          <div className="bg-slate-200 w-full h-full"></div>
          <div className="bg-slate-200 w-full h-full"></div>
        </div>
      </div>

      {/* Content Split (Left: Details, Right: Sticky Sidebar) */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Column: Property Details */}
        <div className="lg:w-2/3 space-y-10 animate-pulse">
          {/* Title and Location */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-20 bg-blue-100 rounded-md"></div>
              <div className="h-6 w-20 bg-emerald-100 rounded-md"></div>
            </div>
            <div className="h-10 w-3/4 bg-slate-200 rounded-lg mb-4"></div>
            <div className="h-5 w-1/2 bg-slate-100 rounded"></div>
          </div>

          {/* Key Stats (Beds, Baths, Sqft) */}
          <div className="flex flex-wrap gap-4 py-6 border-y border-slate-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 w-28">
                <div className="w-10 h-10 bg-slate-100 rounded-full shrink-0"></div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-full bg-slate-200 rounded"></div>
                  <div className="h-3 w-2/3 bg-slate-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <div className="h-6 w-48 bg-slate-200 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-100 rounded"></div>
              <div className="h-4 w-full bg-slate-100 rounded"></div>
              <div className="h-4 w-11/12 bg-slate-100 rounded"></div>
              <div className="h-4 w-full bg-slate-100 rounded"></div>
              <div className="h-4 w-4/5 bg-slate-100 rounded"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div>
            <div className="h-6 w-48 bg-slate-200 rounded mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-slate-100 rounded-md"></div>
                  <div className="h-4 w-24 bg-slate-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="lg:w-1/3">
          <div className="sticky top-28 space-y-6 animate-pulse">
            {/* Pricing & Actions Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              {/* Price */}
              <div className="h-10 w-1/2 bg-slate-200 rounded-lg mb-2"></div>
              <div className="h-4 w-32 bg-slate-100 rounded mb-8"></div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="h-14 w-full bg-slate-100 rounded-2xl"></div>
                <div className="h-14 w-full bg-blue-100 rounded-2xl"></div>
                <div className="h-14 w-full bg-slate-200 rounded-2xl"></div>
              </div>
            </div>

            {/* Mortgage Calculator Placeholder */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
                <div className="h-5 w-40 bg-slate-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-full bg-slate-50 rounded-xl"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-12 w-full bg-slate-50 rounded-xl"></div>
                  <div className="h-12 w-full bg-slate-50 rounded-xl"></div>
                </div>
                <div className="h-12 w-full bg-slate-50 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
