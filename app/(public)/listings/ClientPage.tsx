"use client";

import { useState, useEffect } from "react";
import PropertyFilters, { FilterState } from "@/components/PropertyFilters";
import { getFilteredListings } from "@/lib/actions/getFilteredListings";
import Pagination from "@/components/Pagination";
import ListingCard from "@/components/ListingCard";
import { Loader2 } from "lucide-react";
import { getSavedListingsIds } from "@/lib/actions/user";

interface PaginatedResponse {
  data: any[];
  total: number;
  currentPage: number;
  sizePerPage: number;
  totalPages: number;
}

export default function ClientListing({
  initialData,
}: {
  initialData: PaginatedResponse;
}) {
  // Use lowercase 'string' for TS primitives
  const [savedListingsIds, setSavedListingsIds] = useState<string[]>([]);
  const savedIdsSet = new Set(savedListingsIds);

  // Keep the raw data in state without trying to enrich it up front
  const [listings, setListings] = useState(initialData.data);
  const [totalCount, setTotalCount] = useState(initialData.total);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);

  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);
  const [activeSort, setActiveSort] = useState("Newest Listings");

  // 1. Fetch saved IDs on mount
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const ids = await getSavedListingsIds();
        setSavedListingsIds(ids);
      } catch (e) {
        console.error("Failed to load saved listings");
      }
    };
    fetchSaved();
  }, []);

  // 2. Fetch filtered listings
  useEffect(() => {
    const fetchListings = async () => {
      if (
        !activeFilters &&
        currentPage === 1 &&
        activeSort === "Newest Listings"
      ) {
        setListings(initialData.data);
        setTotalPages(initialData.totalPages);
        setTotalCount(initialData.total);
        return;
      }

      setIsFiltering(true);
      try {
        const response = await getFilteredListings(
          activeFilters || ({} as FilterState),
          currentPage,
          9,
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
  }, [activeFilters, currentPage, activeSort, initialData]);

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  return (
    <main className="pt-32 pb-16 max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <PropertyFilters onApply={handleApplyFilters} />

        <section className="flex-1 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Premium Listings
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Showing {totalCount} properties
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
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer min-w-[160px]"
              >
                <option value="Newest Listings">Newest Listings</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>

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

                  // Dynamically inject the 'saved' state right before passing it down!
                  const isSaved = savedIdsSet.has(property.id);
                  const enrichedProperty = { ...property, saved: isSaved };

                  return (
                    <ListingCard
                      key={enrichedProperty.id}
                      property={enrichedProperty}
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
    </main>
  );
}
