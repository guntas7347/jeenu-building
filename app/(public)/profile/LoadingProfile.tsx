export default function LoadingProfile() {
  return (
    <main className="pt-32 pb-16 max-w-5xl mx-auto px-6 min-h-screen">
      {/* Page Header Skeleton */}
      <div className="mb-10 animate-pulse">
        <div className="h-10 w-64 bg-slate-200 rounded-xl mb-3"></div>
        <div className="h-5 w-96 max-w-full bg-slate-100 rounded-lg"></div>
      </div>

      {/* Modern Tab Navigation Skeleton */}
      <div className="flex items-center gap-2 mb-8 bg-slate-50 p-1.5 rounded-2xl w-fit border border-slate-100 animate-pulse">
        <div className="h-10 w-32 bg-white rounded-xl shadow-sm border border-slate-200"></div>
        <div className="h-10 w-48 bg-slate-200/50 rounded-xl"></div>
      </div>

      {/* Profile Card Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden animate-pulse">
        {/* Top Section (Avatar + Info + Action) */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar Skeleton */}
          <div className="w-24 h-24 rounded-2xl bg-slate-200 shrink-0"></div>

          {/* Info Skeleton */}
          <div className="flex-1 w-full space-y-3">
            <div className="h-8 w-48 bg-slate-200 rounded-lg"></div>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="h-5 w-40 bg-slate-100 rounded-md"></div>
              <div className="h-5 w-32 bg-slate-100 rounded-md"></div>
            </div>
          </div>

          {/* Action Button Skeleton */}
          <div className="w-full md:w-32 h-10 bg-slate-100 rounded-xl shrink-0 mt-4 md:mt-0"></div>
        </div>

        {/* Bio Section Skeleton */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
          <div className="h-3 w-20 bg-slate-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-slate-100 rounded"></div>
          <div className="h-4 w-11/12 bg-slate-100 rounded"></div>
          <div className="h-4 w-4/5 bg-slate-100 rounded"></div>
        </div>
      </div>
    </main>
  );
}
