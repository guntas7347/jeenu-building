"use client";

import { useState } from "react";
import { MapPin, Building2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { PROPERTY_TYPES, AUSTRALIAN_STATES } from "@/lib/config";

const SearchBar = () => {
  const router = useRouter();

  // State for filters
  const [selectedState, setSelectedState] = useState(AUSTRALIAN_STATES[0]);
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (selectedState) {
      params.set("state", selectedState);
    }

    if (propertyType) {
      params.set("propertyType", propertyType);
    }

    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center relative z-50">
      {/* State Selector */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 border-r border-slate-100 relative">
        <MapPin className="text-slate-400 shrink-0" size={24} />
        <div className="text-left w-full">
          <label className="block font-bold tracking-wider text-[10px] text-slate-400 mb-1 uppercase">
            State
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full border-none p-0 focus:ring-0 text-slate-900 font-medium appearance-none bg-transparent outline-none cursor-pointer truncate"
          >
            {AUSTRALIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Property Type Selector */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 border-r border-slate-100">
        <Building2 className="text-slate-400 shrink-0" size={24} />
        <div className="text-left w-full">
          <label className="block font-bold tracking-wider text-[10px] text-slate-400 mb-1 uppercase">
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full border-none p-0 focus:ring-0 text-slate-900 font-medium appearance-none bg-transparent outline-none cursor-pointer truncate"
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSearch}
        className="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 shrink-0"
      >
        <Search size={20} />
        Search Homes
      </button>
    </div>
  );
};

export default SearchBar;
