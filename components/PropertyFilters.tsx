"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MapPin, Filter, X, RotateCcw } from "lucide-react";

export type FilterState = {
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  minArea: string;
  maxArea: string;
  status: string;
};

interface PropertyFiltersProps {
  onApply: (filters: FilterState) => void;
}

const defaultFilters: FilterState = {
  location: "",
  propertyType: "",
  minPrice: "",
  maxPrice: "",
  beds: "",
  baths: "",
  minArea: "",
  maxArea: "",
  status: "AVAILABLE",
};

export default function PropertyFilters({ onApply }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // 1. Extract URL Parameters on Mount
  useEffect(() => {
    // Check if there are any query parameters in the URL
    if (searchParams.toString().length > 0) {
      const urlFilters: FilterState = {
        // Accept either ?city= or ?location=
        location:
          searchParams.get("city") || searchParams.get("location") || "",
        // Accept either ?type= or ?propertyType=
        propertyType:
          searchParams.get("type") || searchParams.get("propertyType") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        beds: searchParams.get("beds") || "",
        baths: searchParams.get("baths") || "",
        minArea: searchParams.get("minArea") || "",
        maxArea: searchParams.get("maxArea") || "",
        status: searchParams.get("status") || "AVAILABLE",
      };

      setFilters(urlFilters);

      // Automatically apply the filters extracted from the URL
      onApply(urlFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on component mount

  // 2. Prevent background scrolling when mobile modal is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePillSelect = (name: "beds" | "baths", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name] === value ? "" : value, // Toggle off if clicked again
    }));
  };

  const handleApply = () => {
    onApply(filters);
    setIsMobileOpen(false);

    if (searchParams.toString().length > 0) {
      router.replace(pathname, { scroll: false });
    }
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onApply(defaultFilters);

    if (searchParams.toString().length > 0) {
      router.replace(pathname, { scroll: false });
    }
  };

  return (
    <>
      {/* Mobile Trigger Button */}
      <div className="lg:hidden w-full mb-6">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 text-slate-800 font-bold rounded-2xl shadow-sm hover:bg-slate-50 transition-colors"
        >
          <Filter size={20} className="text-blue-600" />
          Refine Search
        </button>
      </div>

      {/* Filter Container (Desktop Sidebar & Mobile Full Screen) */}
      <aside
        className={`
          fixed inset-0 z-50 bg-white overflow-y-auto transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:w-72 lg:bg-white lg:p-6 lg:rounded-3xl lg:border lg:border-slate-200 lg:shadow-sm lg:h-fit lg:sticky lg:top-28
          ${isMobileOpen ? "translate-x-0 p-6" : "translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 lg:mb-6">
          <h3 className="text-xl lg:text-lg font-black text-slate-900 flex items-center gap-2 tracking-tight">
            <Filter className="text-blue-600" size={24} />
            Filters
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Reset Filters"
            >
              <RotateCcw size={18} />
            </button>
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="space-y-8 lg:space-y-6">
          {/* Location */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Location
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                name="location"
                value={filters.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm font-medium outline-none transition-all"
                placeholder="City, Neighborhood..."
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Property Type
            </label>
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm font-medium appearance-none outline-none cursor-pointer transition-all"
            >
              <option value="">All Types</option>
              <option value="Modern Villa">Modern Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm font-medium appearance-none outline-none cursor-pointer transition-all"
            >
              <option value="">Any Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Price Range ($)
            </label>
            <div className="flex items-center gap-3">
              <input
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                className="w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm font-medium outline-none transition-all"
                placeholder="Min"
                type="number"
              />
              <span className="text-slate-300 font-bold">-</span>
              <input
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                className="w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm font-medium outline-none transition-all"
                placeholder="Max"
                type="number"
              />
            </div>
          </div>

          {/* Total Area */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Total Area (SqFt)
            </label>
            <div className="flex items-center gap-3">
              <input
                name="minArea"
                value={filters.minArea}
                onChange={handleChange}
                className="w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm font-medium outline-none transition-all"
                placeholder="Min SqFt"
                type="number"
              />
              <span className="text-slate-300 font-bold">-</span>
              <input
                name="maxArea"
                value={filters.maxArea}
                onChange={handleChange}
                className="w-1/2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm font-medium outline-none transition-all"
                placeholder="Max SqFt"
                type="number"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Bedrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {["1", "2", "3", "4", "5+"].map((num) => (
                <button
                  key={`bed-${num}`}
                  onClick={() => handlePillSelect("beds", num)}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all border ${
                    filters.beds === num
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Bathrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {["1", "2", "3", "4+"].map((num) => (
                <button
                  key={`bath-${num}`}
                  onClick={() => handlePillSelect("baths", num)}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all border ${
                    filters.baths === num
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 lg:mt-8 pt-6 border-t border-slate-100 flex gap-3">
          <button
            onClick={handleApply}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
          >
            Show Results
          </button>
        </div>
      </aside>
    </>
  );
}
