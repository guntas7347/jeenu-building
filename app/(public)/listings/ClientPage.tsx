"use client";

import { useState, useEffect } from "react";
import PropertyFilters, { FilterState } from "@/components/PropertyFilters";
import { getFilteredListings } from "@/lib/actions/getFilteredListings";
import Pagination from "@/components/Pagination";
import ListingCard from "./ListingCard";
import { Loader2 } from "lucide-react";
import GoogleLoginModal from "@/components/GoogleLoginModal";

export default function ClientListing({
  initialListings,
  initialTotalPages = 1,
}: {
  initialListings: any[];
  initialTotalPages?: number;
}) {
  // Data State
  const [listings, setListings] = useState(initialListings);
  const [totalCount, setTotalCount] = useState(initialListings.length);

  // UI & Pagination State
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  // Filter & Sort State
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);
  const [activeSort, setActiveSort] = useState("Newest Listings");

  // Effect to refetch whenever page, sort, or filters change
  useEffect(() => {
    const fetchListings = async () => {
      // If no filters are active and we are on page 1 with default sort,
      // we can just use the initial SSR data to save a network request!
      if (
        !activeFilters &&
        currentPage === 1 &&
        activeSort === "Newest Listings"
      ) {
        setListings(initialListings);
        setTotalPages(initialTotalPages);
        return;
      }

      setIsFiltering(true);
      try {
        // Pass empty object if activeFilters is null
        const response = await getFilteredListings(
          activeFilters || ({} as FilterState),
          currentPage,
          9, // 9 items per page fits a 3-column grid perfectly
          activeSort,
        );

        setListings(response.data);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error("Failed to filter listings", error);
      } finally {
        setIsFiltering(false);
      }
    };

    fetchListings();
  }, [activeFilters, currentPage, activeSort]); // Dependencies trigger the refetch

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    setCurrentPage(1); // Always reset to page 1 when new filters are applied
  };

  return (
    <main className="pt-32 pb-16 max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sticky Filters Sidebar */}
        <PropertyFilters onApply={handleApplyFilters} />

        {/* Listings Section */}
        <section className="flex-1 w-full">
          {/* Sorting & Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Premium Listings
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Showing {listings?.length || 0} properties
                {activeFilters && " (Filtered)"}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={activeSort}
                onChange={(e) => {
                  setActiveSort(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on sort change
                }}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer min-w-[160px]"
              >
                <option value="Newest Listings">Newest Listings</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid or Loader */}
          {isFiltering ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-3xl border border-slate-100 shadow-sm">
              <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
              <p className="text-slate-500 font-medium">
                Finding perfect properties...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {listings && listings.length > 0 ? (
                listings.map((property: any) => {
                  const totalSize = property.measurements?.totalSize || "N/A";
                  const displayImage =
                    property.images?.[0] ||
                    "https://placehold.co/800x600/f8fafc/94a3b8?text=No+Image";

                  return (
                    <ListingCard
                      key={property.id}
                      property={property}
                      totalSize={totalSize}
                      displayImage={displayImage}
                    />
                  );
                })
              ) : (
                <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    No properties found
                  </h3>
                  <p>Try adjusting your filters to see more results.</p>
                  <button
                    onClick={() => handleApplyFilters({} as FilterState)}
                    className="mt-6 px-6 py-2.5 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {!isFiltering && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </section>
      </div>
      <GoogleLoginModal isOpen={false} onClose={() => {}} />
    </main>
  );
}
