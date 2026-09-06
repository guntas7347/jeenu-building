"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter, X, RotateCcw } from "lucide-react";
import { AUSTRALIAN_STATES, PROPERTY_TYPES } from "@/lib/config";
import { Select } from "./SelectInput";

export type FilterState = {
  location: string;
  state: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  minArea: string;
  maxArea: string;
  status: string;
};

// Define constants for the slider maximums
const MAX_PRICE_VALUE = "5000000";
const MAX_AREA_VALUE = "2000";

// Helper function to format the price
const formatPrice = (price: string) => {
  if (!price || price === "0" || price === MAX_PRICE_VALUE) return "No Limit";
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(Number(price));
};

export default function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // 1. Internal state for the UI (immediate feedback)
  const [filters, setFilters] = useState<FilterState>({
    location: searchParams.get("location") || "",
    state: searchParams.get("state") || "",
    propertyType: searchParams.get("propertyType") || searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    beds: searchParams.get("beds") || "",
    baths: searchParams.get("baths") || "",
    minArea: searchParams.get("minArea") || "",
    maxArea: searchParams.get("maxArea") || "",
    status: searchParams.get("status") || "",
  });

  // 2. Sync state when URL changes
  useEffect(() => {
    setFilters({
      location: searchParams.get("location") || "",
      state: searchParams.get("state") || "",
      propertyType: searchParams.get("propertyType") || searchParams.get("type") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      beds: searchParams.get("beds") || "",
      baths: searchParams.get("baths") || "",
      minArea: searchParams.get("minArea") || "",
      maxArea: searchParams.get("maxArea") || "",
      status: searchParams.get("status") || "",
    });
  }, [searchParams]);

  // 3. Helper to update the URL
  const updateQuery = (newFilters: Partial<FilterState>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      const isNoLimit = (key === "maxPrice" && value === MAX_PRICE_VALUE) || 
                        (key === "maxArea" && value === MAX_AREA_VALUE) ||
                        (key === "maxPrice" && value === "0");

      if (value && !isNoLimit) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.delete("page"); // Reset pagination on filter change
    router.push(`${pathname}?${params.toString()}`);
  };

  // 4. Handle immediate inputs (Dropdowns & Pills)
  const handleImmediateChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    updateQuery(updated);
  };

  // 5. Handle smooth sliding (Sliders)
  const handleSliderChange = (key: "maxPrice" | "maxArea", value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      updateQuery({ [key]: value });
    }, 400);
  };

  const handlePillSelect = (key: "beds" | "baths", val: string) => {
    const nextVal = filters[key] === val ? "" : val;
    handleImmediateChange({ [key]: nextVal });
  };

  const handleReset = () => {
    setFilters({
      location: "",
      state: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      beds: "",
      baths: "",
      minArea: "",
      maxArea: "",
      status: "",
    });
    router.push(pathname);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden w-full mb-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-full py-3.5 px-4 liquid-glass text-slate-900 dark:text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-sm border border-slate-200 dark:border-white/10"
        >
          <Filter size={18} className="text-primary" />
          Refine Search
        </button>
      </div>

      {/* Filter Container */}
      <aside
        className={`
          fixed inset-0 z-[100] bg-white dark:bg-slate-950 overflow-y-auto transition-transform duration-300 ease-in-out
          lg:static lg:z-10 lg:translate-x-0 lg:w-72 liquid-glass lg:p-6 lg:rounded-3xl lg:border lg:border-slate-200/80 dark:lg:border-white/10 lg:shadow-sm lg:h-fit lg:sticky lg:top-28
          ${isMobileOpen ? "translate-x-0 p-6" : "translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 lg:mb-6">
          <h3 className="text-xl lg:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
            <Filter className="text-primary" size={20} />
            Filters
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
              title="Reset Filters"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* State */}
          <div className="space-y-2">
            <Select
              label="State"
              value={filters.state}
              onChange={(value) => handleImmediateChange({ state: value })}
              options={[{ label: "All States", value: "" }, ...AUSTRALIAN_STATES.map((state) => ({
                value: state,
                label: state,
              }))]}
            />
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <Select
              label="Property Type"
              value={filters.propertyType}
              onChange={(value) => handleImmediateChange({ propertyType: value })}
              options={[{ label: "All Types", value: "" }, ...PROPERTY_TYPES.map((type) => ({
                value: type,
                label: type,
              }))]}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Select
              label="Status"
              value={filters.status}
              onChange={(value) => handleImmediateChange({ status: value })}
              options={[
                { value: "", label: "Any Status" },
                { value: "AVAILABLE", label: "Available" },
                { value: "SOLD", label: "Sold" },
              ]}
            />
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Max Price
              </label>
              <span className="text-sm font-black text-primary tabular-nums">
                {formatPrice(filters.maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={MAX_PRICE_VALUE}
              step="100000"
              value={filters.maxPrice || MAX_PRICE_VALUE}
              onChange={(e) => handleSliderChange("maxPrice", e.target.value)}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
              <span>$0</span>
              <span>$5M+</span>
            </div>
          </div>

          {/* Area Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Max Area (m²)
              </label>
              <span className="text-sm font-black text-primary tabular-nums">
                {(!filters.maxArea || filters.maxArea === MAX_AREA_VALUE) ? "Any Size" : `${filters.maxArea} m²`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={MAX_AREA_VALUE}
              step="100"
              value={filters.maxArea || MAX_AREA_VALUE}
              onChange={(e) => handleSliderChange("maxArea", e.target.value)}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
              <span>0</span>
              <span>2000+</span>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Bedrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {["1", "2", "3", "4", "5+"].map((num) => (
                <button
                  key={`bed-${num}`}
                  onClick={() => handlePillSelect("beds", num)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                    filters.beds === num
                      ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Bathrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {["1", "2", "3", "4+"].map((num) => (
                <button
                  key={`bath-${num}`}
                  onClick={() => handlePillSelect("baths", num)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                    filters.baths === num
                      ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-8 py-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Updates automatically
          </p>
        </div>
      </aside>
    </>
  );
}
