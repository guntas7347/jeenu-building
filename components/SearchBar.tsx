"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Building2, Banknote, Search, Loader2 } from "lucide-react";
import { searchLocations } from "@/lib/location";

// Define the type based on your lib/location.ts return format
interface LocationResult {
  name: string;
  lat: string;
  lon: string;
}

const SearchBar = () => {
  // State for the location search
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // State for other filters
  const [propertyType, setPropertyType] = useState("Modern Villa");
  const [priceRange, setPriceRange] = useState("$500k - $1M");

  const wrapperRef = useRef<HTMLDivElement>(null);

  // 1. Debounce the query to prevent API spam
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // 2. Fetch locations when debounced query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchLocations(debouncedQuery);
        // The API already limits to 5, but we can enforce it here safely
        setResults(data.slice(0, 5));
        setIsOpen(true);
      } catch (error) {
        console.error("Failed to fetch locations", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // 3. Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Handle location selection
  const handleSelectLocation = (location: LocationResult) => {
    setQuery(location.name);
    setIsOpen(false);
  };

  // Handle the final search execution
  const handleSearch = () => {
    console.log("Searching with:", { query, propertyType, priceRange });
    // Add your routing logic here, e.g., router.push(`/search?loc=${query}&type=${propertyType}...`)
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-4 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center relative z-50">
      {/* Location Input with Dropdown */}
      <div
        ref={wrapperRef}
        className="flex-1 w-full flex items-center gap-3 px-4 py-3 border-r border-slate-100 relative"
      >
        <MapPin className="text-slate-400 shrink-0" size={24} />
        <div className="text-left w-full">
          <label className="block font-bold tracking-wider text-[10px] text-slate-400 mb-1 uppercase">
            Location
          </label>
          <input
            className="w-full border-none p-0 focus:ring-0 text-slate-900 font-medium placeholder:text-slate-300 outline-none"
            placeholder="Where are you looking?"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (results.length > 0) setIsOpen(true);
            }}
          />
        </div>

        {/* Autocomplete Dropdown */}
        {isOpen && query.trim().length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-50">
            {isLoading ? (
              <div className="flex items-center justify-center p-4 text-slate-400">
                <Loader2 className="animate-spin" size={20} />
                <span className="ml-2 text-sm font-medium">Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <ul className="max-h-64 overflow-y-auto py-2">
                {results.map((loc, index) => (
                  <li key={`${loc.lat}-${loc.lon}-${index}`}>
                    <button
                      onClick={() => handleSelectLocation(loc)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                    >
                      <MapPin
                        className="text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5"
                        size={18}
                      />
                      <span className="text-sm text-slate-700 font-medium line-clamp-2">
                        {loc.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-sm text-slate-500 font-medium">
                No locations found.
              </div>
            )}
          </div>
        )}
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
            <option>Modern Villa</option>
            <option>Apartment</option>
            <option>Townhouse</option>
            <option>Penthouse</option>
          </select>
        </div>
      </div>

      {/* Price Range Selector */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-3">
        <Banknote className="text-slate-400 shrink-0" size={24} />
        <div className="text-left w-full">
          <label className="block font-bold tracking-wider text-[10px] text-slate-400 mb-1 uppercase">
            Price Range
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full border-none p-0 focus:ring-0 text-slate-900 font-medium appearance-none bg-transparent outline-none cursor-pointer truncate"
          >
            <option>$500k - $1M</option>
            <option>$1M - $3M</option>
            <option>$3M+</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSearch}
        className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 shrink-0"
      >
        <Search size={20} />
        Search Homes
      </button>
    </div>
  );
};

export default SearchBar;
