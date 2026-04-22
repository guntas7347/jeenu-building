import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Property } from "@/types";
import { getAllProperties } from "@/lib/firebase/services";

const filterSpecs = [
  { label: "4+ Beds", icon: Bed },
  { label: "3+ Baths", icon: Bath },
];

const propertyTypes = ["Villa", "Penthouse", "Estate"];

export default async function ListingPage() {
  const properties = await getAllProperties();

  return (
    <main className="pt-8 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
      <header className="mb-16">
        <p className="text-primary font-label text-sm uppercase tracking-[0.2em] mb-4">
          Curated Collection
        </p>
        <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface">
          Exceptional Residences
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-80 shrink-0 space-y-10">
          <div className="bg-surface-container p-8 rounded-xl space-y-8">
            <h3 className="text-xl font-bold tracking-tight border-b border-outline-variant/10 pb-4">
              Refine Search
            </h3>
            {/* Location Filter */}
            <div className="space-y-4">
              <label className="text-primary font-label text-xs uppercase tracking-widest block">
                Location
              </label>
              <div className="relative">
                <input
                  className="form-input pr-10"
                  placeholder="Search cities..."
                  type="text"
                />
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-primary font-label text-xs uppercase tracking-widest">
                  Price Range
                </label>
                <span className="text-on-surface-variant text-xs">
                  $2M - $50M+
                </span>
              </div>
              <div className="relative h-1 bg-surface-container-highest rounded-full">
                <div className="absolute h-full w-2/3 bg-primary left-4 rounded-full" />
                <div className="absolute w-4 h-4 bg-primary rounded-full top-1/2 -translate-y-1/2 left-4 shadow-xl border-2 border-on-primary" />
                <div className="absolute w-4 h-4 bg-primary rounded-full top-1/2 -translate-y-1/2 left-2/3 shadow-xl border-2 border-on-primary" />
              </div>
            </div>

            {/* Property Specs */}
            <div className="space-y-4">
              <label className="text-primary font-label text-xs uppercase tracking-widest block">
                Specifications
              </label>
              <div className="grid grid-cols-2 gap-3">
                {filterSpecs.map((spec, idx) => {
                  const Icon = spec.icon;
                  return (
                    <button
                      key={idx}
                      className="bg-surface-container-low py-3 px-4 rounded-md text-xs font-bold border border-outline-variant/10 hover:border-primary transition-colors flex items-center justify-between cursor-pointer"
                    >
                      {spec.label} <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-4">
              <label className="text-primary font-label text-xs uppercase tracking-widest block">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-full uppercase tracking-tighter cursor-pointer transition-colors ${
                      idx === 0
                        ? "bg-secondary-container text-on-surface"
                        : "bg-surface-container-low text-on-surface-variant border border-outline-variant/10 hover:border-primary/50"
                    }`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <button className="w-full bg-gradient-gold text-on-primary py-4 rounded-md font-bold tracking-wide mt-4 uppercase text-xs cursor-pointer">
              Update Results
            </button>
          </div>
        </aside>

        {/* Property Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <p className="text-on-surface-variant font-label text-sm">
              Showing{" "}
              <span className="text-on-surface font-bold">
                {properties.length}
              </span>{" "}
              exclusive properties
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest hidden sm:block">
                Sort By:
              </span>
              <select className="bg-transparent border-none text-primary font-bold text-sm focus:ring-0 cursor-pointer outline-none">
                <option>Newest First</option>
                <option>Price (High to Low)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {properties.map((property) => (
              <Link
                href={`/listing/${property.id}`}
                key={property.id}
                className="block group"
              >
                <div className="bg-surface-container rounded-xl overflow-hidden hover:shadow-[0_32px_64px_rgba(0,0,0,0.4)] transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-80 overflow-hidden shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      src={
                        property.images && property.images.length > 0
                          ? property.images[0]
                          : "https://lh3.googleusercontent.com/aida-public/AB6AXuBnv-q8zzuoIDeX8fmxbg20w8vHTz3YZS2LjDCyw17OzrSCdU2EPamOtb8M8UUn45Mgm_UwDTUSWnXsz_qGA9ZKO-kTXHx5iUx5hbLMfbnD915WuziopI3j-RPyTQBatbrWSRpYUyExqUWf_EjD2eeSfsotYZj5qL112Z9KLzebQC06PjysI2d4DGZq-pjY-714pR8UK12rfmSmiiQjXSQ-csCtQPyxzdnwvW2laHslxAeFNMLmvszBqkHkSllS5BXkHBt-gJFZkTDc"
                      }
                      alt={property.title}
                    />
                    {property.status && property.status !== "Active" && (
                      <div className="absolute top-6 left-6 px-4 py-1.5 glass-panel rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
                        {property.status}
                      </div>
                    )}
                    <button className="absolute top-6 right-6 w-10 h-10 glass-panel rounded-full flex items-center justify-center text-on-surface hover:text-error transition-colors cursor-pointer z-10">
                      <Heart className="w-5 h-5 text-on-surface" />
                    </button>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                        <h3 className="text-2xl font-bold tracking-tight text-on-surface">
                          {property.title}
                        </h3>
                        <p className="text-2xl font-light text-primary tracking-tighter whitespace-nowrap">
                          {property.price}
                        </p>
                      </div>
                      <p className="text-on-surface-variant text-sm mb-6 flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0" />{" "}
                        {property.location}
                      </p>
                    </div>
                    <div className="flex gap-6 pt-6 border-t border-outline-variant/10">
                      <div className="flex flex-col">
                        <span className="text-primary font-label text-[10px] uppercase tracking-widest">
                          Beds
                        </span>
                        <span className="text-lg font-bold text-on-surface">
                          {property.beds}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-primary font-label text-[10px] uppercase tracking-widest">
                          Baths
                        </span>
                        <span className="text-lg font-bold text-on-surface">
                          {property.baths}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-primary font-label text-[10px] uppercase tracking-widest">
                          Area
                        </span>
                        <span className="text-lg font-bold text-on-surface">
                          {property.sqft}{" "}
                          <span className="text-xs font-normal opacity-50">
                            sqft
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-20 flex justify-center items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center border border-outline-variant/10 rounded-md hover:border-primary transition-colors text-on-surface cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-md font-bold transition-colors bg-primary text-on-primary">
              1
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-outline-variant/10 rounded-md hover:border-primary transition-colors text-on-surface cursor-pointer">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
