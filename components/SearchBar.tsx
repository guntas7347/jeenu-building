"use client";

import { useState } from "react";
import { MapPin, Building2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { PROPERTY_TYPES, AUSTRALIAN_STATES } from "@/lib/config";
import { Select } from "./SelectInput";

const SearchBar = () => {
  const router = useRouter();

  // State for filters
  const [selectedState, setSelectedState] = useState("");
  const [propertyType, setPropertyType] = useState("");

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
        <Select
          label="State"
          placeholder="All States"
          options={[{ label: "All States", value: "" }, ...AUSTRALIAN_STATES.map(s => ({ label: s, value: s }))]}
          value={selectedState}
          onChange={(value) => setSelectedState(value as string)}
        />
      </div>

      {/* Property Type Selector */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 border-r border-slate-100">
        <Building2 className="text-slate-400 shrink-0" size={24} />
        <Select
          label="Property Type"
          placeholder="All Types"
          options={[{ label: "All Types", value: "" }, ...PROPERTY_TYPES.map(t => ({ label: t, value: t }))]}
          value={propertyType}
          onChange={(value) => setPropertyType(value as string)}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSearch}
        className="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 shrink-0"
      >
        <Search size={20} />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
