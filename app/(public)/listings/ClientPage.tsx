"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [savedListingsIds, setSavedListingsIds] = useState<string[]>([]);
  const savedIdsSet = new Set(savedListingsIds);

  const [listings, setListings] = useState(initialData.data);
  const [totalCount, setTotalCount] = useState(initialData.total);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);

  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
        searchParams.toString().length === 0 &&
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
        const filters: FilterState = {
          location: searchParams.get("location") || "",
          state: searchParams.get("state") || "",
          propertyType:
            searchParams.get("type") || searchParams.get("propertyType") || "",
          minPrice: searchParams.get("minPrice") || "",
          maxPrice: searchParams.get("maxPrice") || "",
          beds: searchParams.get("beds") || "",
          baths: searchParams.get("baths") || "",
          minArea: searchParams.get("minArea") || "",
          maxArea: searchParams.get("maxArea") || "",
          status: searchParams.get("status") || "",
        };

        const response = await getFilteredListings(
          filters,
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
  }, [searchParams, currentPage, activeSort, initialData]);

  return (
    <main className="pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <PropertyFilters />

        <section className="flex-1 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Build Listings
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Showing {totalCount} properties
                {Array.from(searchParams.values()).some(v => v !== "") && " (Filtered)"}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={activeSort}
                onChange={(e) => {
                  setActiveSort(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer min-w-[160px]"
              >
                <option value="Newest Listings">Newest Listings</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {isFiltering ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] liquid-glass rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-sm">
              <Loader2 className="animate-spin text-primary mb-4" size={40} />
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
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
                <div className="col-span-full py-16 text-center text-slate-500 dark:text-slate-400 liquid-glass rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-sm p-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    No properties found
                  </h3>
                  <p className="text-sm">Try adjusting your filters to see more results.</p>
                  <button
                    onClick={() => router.push(pathname)}
                    className="mt-6 px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 font-bold text-sm rounded-xl transition-colors cursor-pointer"
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
