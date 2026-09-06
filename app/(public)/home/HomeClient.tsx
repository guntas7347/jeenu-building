"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Building2,
  DollarSign,
  Bed,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  TrendingUp,
  SlidersHorizontal,
  Phone,
  Calendar,
  Layers,
  Star,
  Compass,
  Zap,
} from "lucide-react";
import { AUSTRALIAN_STATES, PROPERTY_TYPES, CONTACT_NUMBER } from "@/lib/config";
import { formatPrice } from "@/lib/helpers";
import ListingCard from "@/components/ListingCard";

const QUICK_TRENDS = [
  { label: "Sydney Turnkey", state: "New South Wales", type: "House" },
  { label: "Dual-Key High Yield", state: "", type: "Dual Key" },
  { label: "Queensland Coastal", state: "Queensland", type: "House" },
  { label: "Luxury Duplexes", state: "", type: "Duplex" },
  { label: "South Australia Builds", state: "South Australia", type: "" },
];

const GROWTH_CORRIDORS = [
  {
    name: "Sydney North-West & Western Corridors",
    state: "NSW",
    growth: "+8.4% YoY",
    yield: "4.8% - 5.6%",
    description: "Driven by Sydney Metro infrastructure and the Western Sydney Aerotropolis expansion.",
    features: ["Turnkey packages available", "High capital growth", "Close to top private schools"],
  },
  {
    name: "Brisbane & Gold Coast Coastal Ring",
    state: "QLD",
    growth: "+11.2% YoY",
    yield: "5.5% - 6.4%",
    description: "Unprecedented interstate migration leading up to the 2032 Olympic Games infrastructure boom.",
    features: ["Dual key packages", "Strong rental demand", "Sub-tropical architectural builds"],
  },
  {
    name: "Adelaide Premium Inner & Hills Estates",
    state: "SA",
    growth: "+7.9% YoY",
    yield: "5.2% - 5.9%",
    description: "Stable, resilient market offering higher rental yields and exceptional value per square metre.",
    features: ["Fixed price guarantee", "Bespoke custom finishes", "Zero hidden site costs"],
  },
];

interface HomeClientProps {
  initialListings: any[];
}

export default function HomeClient({ initialListings }: HomeClientProps) {
  const router = useRouter();

  // Search State
  const [selectedState, setSelectedState] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceBudget, setPriceBudget] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Interactive Yield Estimator State
  const [calculatorBuildCost, setCalculatorBuildCost] = useState(1200000);
  const [estimatedWeeklyRent, setEstimatedWeeklyRent] = useState(1350);
  const [activeCorridor, setActiveCorridor] = useState(0);

  // Computed Yield
  const calculatedGrossYield = useMemo(() => {
    if (!calculatorBuildCost || !estimatedWeeklyRent) return "0.00";
    const annualRent = estimatedWeeklyRent * 52;
    return ((annualRent / calculatorBuildCost) * 100).toFixed(2);
  }, [calculatorBuildCost, estimatedWeeklyRent]);

  // Handle Search Submission
  const handleSearch = (overrideParams?: { state?: string; type?: string }) => {
    const params = new URLSearchParams();
    const stateVal = overrideParams?.state !== undefined ? overrideParams.state : selectedState;
    const typeVal = overrideParams?.type !== undefined ? overrideParams.type : propertyType;

    if (stateVal) params.set("state", stateVal);
    if (typeVal) params.set("propertyType", typeVal);
    if (priceBudget) {
      if (priceBudget === "under-1m") params.set("maxPrice", "1000000");
      if (priceBudget === "1m-1.5m") {
        params.set("minPrice", "1000000");
        params.set("maxPrice", "1500000");
      }
      if (priceBudget === "1.5m-plus") params.set("minPrice", "1500000");
    }
    if (minBeds) params.set("beds", minBeds);

    router.push(`/listings?${params.toString()}`);
  };

  // Filtered Properties for Category Switcher
  const displayedProperties = useMemo(() => {
    if (!initialListings || initialListings.length === 0) return [];
    if (activeCategory === "all") return initialListings;
    return initialListings.filter((p) => {
      const type = (p.propertyType || "").toLowerCase();
      const badge = (p.badge || "").toLowerCase();
      const title = (p.title || "").toLowerCase();
      const cat = activeCategory.toLowerCase();

      if (cat === "dual key") return type.includes("dual") || title.includes("dual");
      if (cat === "house") return type.includes("house") || title.includes("house");
      if (cat === "duplex") return type.includes("duplex") || title.includes("duplex");
      if (cat === "turnkey") return badge.includes("turnkey") || title.includes("turnkey") || type.includes("house");
      return type.includes(cat) || badge.includes(cat);
    });
  }, [activeCategory, initialListings]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* ── AMBIENT APPLE-LIKE LIQUID BACKGROUND GLOWS ────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Primary Soft Glow Top Right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[130px] dark:bg-primary/15 transition-all duration-1000" />
        {/* Amber / Warm Secondary Glow Middle Left */}
        <div className="absolute top-[35%] -left-40 w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[140px] dark:bg-amber-600/10 transition-all duration-1000" />
        {/* Sky / Indigo Subtlety Bottom Center */}
        <div className="absolute top-[75%] right-[15%] w-[700px] h-[700px] rounded-full bg-indigo-500/8 blur-[160px] dark:bg-indigo-600/10" />
      </div>

      {/* ── HERO SECTION ──────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-32 sm:pt-36 md:pt-44 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full liquid-glass-pill text-xs font-semibold text-slate-800 dark:text-slate-200 mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="tracking-wide">Australia's Premier Turnkey & Dual-Key Builder</span>
            <Sparkles size={13} className="text-primary" />
          </div>

          {/* Monumental Apple Typography */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
            Architectural Precision.{" "}
            <span className="bg-gradient-to-r from-primary via-red-600 to-amber-600 bg-clip-text text-transparent">
              Timeless Living.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Master-planned turnkey residences, custom luxury builds, and high-yield dual-occupancy packages crafted across New South Wales, Queensland, and South Australia.
          </p>
        </div>

        {/* ── APPLE LIQUID GLASS SEARCH HUB ────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto mt-2">
          <div className="liquid-glass-elevated rounded-[2.2rem] p-3 sm:p-5 shadow-2xl relative">
            {/* Top Row: Search Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-1">
              {/* 1. Location / State */}
              <div className="liquid-glass rounded-2xl p-3 flex items-center gap-3 border border-white/60 dark:border-white/10 hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                  <MapPin size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                    Location
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer truncate"
                  >
                    <option value="" className="text-slate-800 dark:text-slate-900">
                      All Australian States
                    </option>
                    {AUSTRALIAN_STATES.map((state) => (
                      <option key={state} value={state} className="text-slate-800 dark:text-slate-900">
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 2. Property Type */}
              <div className="liquid-glass rounded-2xl p-3 flex items-center gap-3 border border-white/60 dark:border-white/10 hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                  <Building2 size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                    Build Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer truncate"
                  >
                    <option value="" className="text-slate-800 dark:text-slate-900">
                      All Property Types
                    </option>
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type} className="text-slate-800 dark:text-slate-900">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Budget Range */}
              <div className="liquid-glass rounded-2xl p-3 flex items-center gap-3 border border-white/60 dark:border-white/10 hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                  <DollarSign size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                    Budget
                  </label>
                  <select
                    value={priceBudget}
                    onChange={(e) => setPriceBudget(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer truncate"
                  >
                    <option value="" className="text-slate-800 dark:text-slate-900">
                      Any Price Range
                    </option>
                    <option value="under-1m" className="text-slate-800 dark:text-slate-900">
                      Under $1,000,000
                    </option>
                    <option value="1m-1.5m" className="text-slate-800 dark:text-slate-900">
                      $1,000,000 - $1,500,000
                    </option>
                    <option value="1.5m-plus" className="text-slate-800 dark:text-slate-900">
                      $1,500,000+
                    </option>
                  </select>
                </div>
              </div>

              {/* 4. Bedrooms / Search Button */}
              <div className="flex items-center gap-2">
                <div className="liquid-glass flex-1 rounded-2xl p-3 flex items-center gap-2.5 border border-white/60 dark:border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                    <Bed size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                      Beds
                    </label>
                    <select
                      value={minBeds}
                      onChange={(e) => setMinBeds(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer truncate"
                    >
                      <option value="" className="text-slate-800 dark:text-slate-900">Any</option>
                      <option value="3" className="text-slate-800 dark:text-slate-900">3+ Beds</option>
                      <option value="4" className="text-slate-800 dark:text-slate-900">4+ Beds</option>
                      <option value="5" className="text-slate-800 dark:text-slate-900">5+ Beds</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => handleSearch()}
                  className="h-full px-6 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-95 transition-all shrink-0 cursor-pointer"
                  aria-label="Search properties"
                >
                  <Search size={18} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Bottom Row: Quick Trend Pills */}
            <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-400 font-medium">
                <TrendingUp size={14} className="text-primary" />
                <span className="hidden sm:inline">Popular Searches:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {QUICK_TRENDS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSearch({ state: item.state, type: item.type })}
                    className="px-3 py-1 rounded-full liquid-glass-pill text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:border-primary/40 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUST METRICS CAPSULE ─────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="liquid-glass rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
              <ShieldCheck size={18} />
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">100%</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Fixed-Price Guarantee</p>
          </div>

          <div className="liquid-glass rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-1">
              <Award size={18} />
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">450+</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Delivered Homes</p>
          </div>

          <div className="liquid-glass rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-500 mb-1">
              <Clock size={18} />
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">25-Yr</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Structural Warranty</p>
          </div>

          <div className="liquid-glass rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-indigo-500 mb-1">
              <Star size={18} className="fill-amber-400 text-amber-400" />
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">4.9 / 5</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Discerning Reviews</p>
          </div>
        </div>
      </section>

      {/* ── CURATED LISTINGS SHOWCASE (FROM ORIGINAL DATABASE DATA) ───────────────── */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
              <Compass size={15} />
              <span>Verified Listings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Build Packages
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-xl">
              Live turn-key packages and architectural builds direct from our portfolio across Australia.
            </p>
          </div>

          {/* Collection Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 liquid-glass rounded-2xl">
            {[
              { id: "all", label: "All Builds" },
              { id: "House", label: "Houses" },
              { id: "Dual Key", label: "Dual Key" },
              { id: "Duplex", label: "Duplexes" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        {displayedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {displayedProperties.map((property) => {
              const totalSize =
                property.measurements?.totalSize ||
                (typeof property.totalSize === "number" ? `${property.totalSize}` : "N/A");
              const displayImage =
                property.images?.[0] ||
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

              return (
                <ListingCard
                  key={property.id}
                  property={property}
                  totalSize={totalSize}
                  displayImage={displayImage}
                />
              );
            })}
          </div>
        ) : (
          <div className="liquid-glass rounded-3xl p-12 text-center max-w-xl mx-auto border border-slate-200/60 dark:border-white/10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No builds matching this category
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Browse all available listings or reset your category filter.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-md hover:bg-primary/90 transition-all cursor-pointer"
            >
              Show All Builds
            </button>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl liquid-glass font-bold text-sm text-slate-900 dark:text-white hover:text-primary border border-white/80 dark:border-white/10 hover:border-primary/40 shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            <span>Browse All Australian Packages</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── THE RED OWL ADVANTAGE - APPLE-STYLE BENTO GRID ────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
            <Zap size={15} />
            <span>The Red Owl Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for Value. Crafted for Life.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3">
            Experience our transparent, architect-led approach to modern property construction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento 1: Fixed Price Guarantee (Col 7) */}
          <div className="lg:col-span-7 liquid-glass-card rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="px-3.5 py-1.5 rounded-full liquid-glass-pill text-[11px] font-bold text-primary uppercase tracking-wider mb-4 inline-block">
                Transparent Contracting
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                100% Fixed-Price Turnkey Guarantee
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 max-w-lg">
                No hidden soil surcharge, no unexpected site variation costs, and no surprise escalation fees. Everything from council approvals to premium driveways and landscaping is locked in upfront.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Complete Landscaping & Fencing",
                  "2.7m High Architectural Ceilings",
                  "Ducted Reverse-Cycle Air",
                  "40mm Stone Island Benchtops",
                  "Full Council Approvals Included",
                  "Premium 900mm Kitchen Appliances",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bento 2: Interactive Yield & Mortgage Estimator (Col 5) */}
          <div className="lg:col-span-5 liquid-glass-elevated rounded-[2.5rem] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Live Calculator
                </span>
                <SlidersHorizontal size={18} className="text-slate-400" />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                Smart Yield Estimator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Calculate estimated gross rental yields on dual-key and turnkey builds.
              </p>

              {/* Build Cost Slider */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-500">Package Price:</span>
                    <span className="text-slate-900 dark:text-white font-mono">{formatPrice(calculatorBuildCost)}</span>
                  </div>
                  <input
                    type="range"
                    min="700000"
                    max="2500000"
                    step="25000"
                    value={calculatorBuildCost}
                    onChange={(e) => setCalculatorBuildCost(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  />
                </div>

                {/* Weekly Rent Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-500">Combined Weekly Rent:</span>
                    <span className="text-slate-900 dark:text-white font-mono">${estimatedWeeklyRent}/wk</span>
                  </div>
                  <input
                    type="range"
                    min="700"
                    max="2500"
                    step="25"
                    value={estimatedWeeklyRent}
                    onChange={(e) => setEstimatedWeeklyRent(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="liquid-glass rounded-2xl p-4 flex items-center justify-between border border-emerald-500/30">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Est. Gross Yield
                </p>
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                  {calculatedGrossYield}% <span className="text-xs font-semibold text-slate-500">p.a.</span>
                </p>
              </div>
              <Link
                href="/calculator"
                className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:opacity-90 active:scale-95 transition-all"
              >
                Full Calculator
              </Link>
            </div>
          </div>

          {/* Bento 3: Prime Corridors (Col 12) */}
          <div className="lg:col-span-12 liquid-glass-card rounded-[2.5rem] p-8 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <span className="px-3.5 py-1.5 rounded-full liquid-glass-pill text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3 inline-block">
                  Strategic Location Hubs
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  High-Growth Australian Corridors
                </h3>
              </div>

              {/* Corridor Switcher Buttons */}
              <div className="flex flex-wrap gap-2">
                {GROWTH_CORRIDORS.map((corridor, idx) => (
                  <button
                    key={corridor.name}
                    onClick={() => setActiveCorridor(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeCorridor === idx
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-[1.02]"
                        : "liquid-glass text-slate-600 dark:text-slate-300 hover:border-primary/40"
                    }`}
                  >
                    {corridor.state} - {corridor.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200/50 dark:border-white/5">
              <div className="liquid-glass rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Active Corridor
                </p>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {GROWTH_CORRIDORS[activeCorridor].name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {GROWTH_CORRIDORS[activeCorridor].description}
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-5 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-slate-500">Historical Capital Growth</span>
                  <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                    {GROWTH_CORRIDORS[activeCorridor].growth}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">Average Rental Yield</span>
                  <span className="text-base font-extrabold text-primary">
                    {GROWTH_CORRIDORS[activeCorridor].yield}
                  </span>
                </div>
              </div>

              <div className="liquid-glass rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Investment Highlights
                </p>
                <div className="space-y-1.5">
                  {GROWTH_CORRIDORS[activeCorridor].features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4-STEP STREAMLINED JOURNEY ────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">
            Effortless Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Your Home Comes to Life
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Block & Plan Selection",
              desc: "Choose from our curated turnkey land packages or let our architects match a custom design to your block.",
              icon: Layers,
            },
            {
              step: "02",
              title: "Fixed-Price Contract",
              desc: "Transparent contracts with guaranteed build times, full council approvals, and no hidden variations.",
              icon: ShieldCheck,
            },
            {
              step: "03",
              title: "Precision Construction",
              desc: "Dedicated project manager and weekly photographic milestone updates directly to your client portal.",
              icon: Clock,
            },
            {
              step: "04",
              title: "Handover & Warranty",
              desc: "Turnkey walkthrough with keys in hand, backed by our comprehensive 25-year structural warranty.",
              icon: Award,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="liquid-glass-card rounded-[2rem] p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-primary/40 font-mono">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">
            Verified Homeowners
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "The fixed-price guarantee gave us complete peace of mind. We built a dual-key package in Norwest that was completed 2 weeks ahead of schedule and rented out immediately.",
              author: "Marcus & Priya K.",
              location: "Norwest NSW",
              type: "Dual-Key Investor",
            },
            {
              quote:
                "Red Owl's attention to detail is unmatched. The high ceilings, stone benchtops, and ducted air were all standard inclusions with zero price surprises.",
              author: "David & Sarah T.",
              location: "Gold Coast QLD",
              type: "Custom Family Home",
            },
            {
              quote:
                "As first-time home builders, having our dedicated portal with weekly build photos took all the anxiety out of the process. Absolutely exceptional team.",
              author: "James H.",
              location: "Adelaide SA",
              type: "Turnkey Package",
            },
          ].map((testi, idx) => (
            <div
              key={idx}
              className="liquid-glass-card rounded-[2rem] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{testi.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {testi.author}
                  </h4>
                  <p className="text-[10px] text-slate-400">{testi.location}</p>
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {testi.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIQUID GLASS CONSULTATION / VIP BOOKING BANNER ────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="liquid-glass-elevated rounded-[3rem] p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl border border-white/80 dark:border-white/10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="px-4 py-1.5 rounded-full liquid-glass-pill text-xs font-bold text-primary uppercase tracking-widest mb-6 inline-block shadow-sm">
              Personalized Consultation
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Ready to Design Your Next Chapter?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Speak with our senior architectural build specialists for a complimentary site assessment, custom floorplan consultation, and guaranteed fixed-price proposal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${CONTACT_NUMBER}`}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-primary/25 active:scale-95 transition-all"
              >
                <Phone size={18} />
                <span>Call {CONTACT_NUMBER}</span>
              </a>

              <Link
                href="/listings"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl liquid-glass text-slate-900 dark:text-white font-bold text-sm flex items-center justify-center gap-2.5 hover:border-primary/40 border border-white/70 dark:border-white/15 active:scale-95 transition-all"
              >
                <Calendar size={18} className="text-primary" />
                <span>Browse Available Land & Builds</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
