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
      // Logic: Only apply if value is present AND not the "No Limit" indicator
      const isNoLimit = (key === "maxPrice" && value === MAX_PRICE_VALUE) || 
                        (key === "maxArea" && value === MAX_AREA_VALUE) ||
                        (value === "");

      if (value && !isNoLimit) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Remove duplicates/consistency
    if (params.has("type")) {
      const t = params.get("type");
      params.delete("type");
      params.set("propertyType", t!);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleImmediateChange = (newFilters: Partial<FilterState>) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setFilters(prev => ({ ...prev, ...newFilters }));
    updateQuery(newFilters);
  };

  const handleSliderChange = (name: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      updateQuery({ [name]: value });
    }, 2000);
  };

  const handlePillSelect = (name: "beds" | "baths", value: string) => {
    const newValue = filters[name] === value ? "" : value;
    handleImmediateChange({ [name]: newValue });
  };

  const handleReset = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    router.replace(pathname, { scroll: false });
    setIsMobileOpen(false);
  };

  const formatPrice = (price: string) => {
    if (!price || price === MAX_PRICE_VALUE) return "Any Price";
    const num = parseInt(price);
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    return `$${(num / 1000).toFixed(0)}k`;
  };

  return (
    <>
      {/* Mobile Trigger Button */}
      <div className="lg:hidden w-full mb-6 px-1">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 text-slate-800 font-bold rounded-2xl shadow-sm hover:bg-slate-50 transition-colors"
        >
          <Filter size={20} className="text-blue-600" />
          Refine Search
        </button>
      </div>

      {/* Filter Container */}
      <aside
        className={`
          fixed inset-0 z-[100] bg-white overflow-y-auto transition-transform duration-300 ease-in-out
          lg:static lg:z-10 lg:translate-x-0 lg:w-72 lg:bg-white lg:p-6 lg:rounded-3xl lg:border lg:border-slate-200 lg:shadow-sm lg:h-fit lg:sticky lg:top-28
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
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="space-y-8 lg:space-y-6">
          {/* State */}
          <div className="space-y-2.5">
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
          <div className="space-y-2.5">
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
          <div className="space-y-2.5">
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
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Max Price
              </label>
              <span className="text-sm font-black text-blue-600 tabular-nums">
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
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
              <span>$0</span>
              <span>$5M+</span>
            </div>
          </div>

          {/* Area Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Max Area (m²)
              </label>
              <span className="text-sm font-black text-blue-600 tabular-nums">
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
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
              <span>0</span>
              <span>2000+</span>
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

        <div className="lg:hidden mt-8 py-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Updates automatically
          </p>
        </div>
      </aside>
    </>
  );
}
