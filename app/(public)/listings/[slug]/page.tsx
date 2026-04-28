import { getListingBySlug } from "@/lib/actions/listings";
import { notFound } from "next/navigation";
import {
  MapPin,
  BedDouble,
  Bath,
  Car,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Download,
  Calculator,
  ExternalLink,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import PropertyGallery from "./PropertyGallery";
import { formatPrice } from "@/lib/helpers";

type Params = Promise<{ slug: string }>;

// Helper to convert camelCase keys (e.g. builtUp) to Title Case (e.g. Built Up)
const formatLabel = (key: string) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default async function PropertyDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  // --- DYNAMIC DATA PREPARATION ---

  // 1. Pad images array to ensure the 5-grid layout always works
  const defaultPlaceholder =
    "https://placehold.co/800x600/f8fafc/94a3b8?text=Property+Image";
  const rawImages =
    listing.images && listing.images.length > 0
      ? listing.images
      : [defaultPlaceholder];
  const displayImages = [
    ...rawImages,
    ...Array(3).fill(defaultPlaceholder),
  ].slice(0, 3);

  // 2. Map Key Specs
  const keySpecs = [
    { icon: BedDouble, label: "Bedrooms", value: `${listing.beds} Beds` },
    { icon: Bath, label: "Bathrooms", value: `${listing.baths} Baths` },
    { icon: Car, label: "Garage", value: `${listing.garages} Cars` },
    {
      icon: Calendar,
      label: "Listed On",
      value: new Date(listing.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    },
  ];

  // 3. Process JSON Measurements safely
  const rawMeasurements =
    typeof listing.measurements === "string"
      ? JSON.parse(listing.measurements)
      : listing.measurements || {};

  const measurementsList = Object.entries(rawMeasurements)
    .filter(([_, value]) => value && value !== "0" && value !== "")
    .map(([key, value]) => ({
      label: formatLabel(key),
      value: String(value),
    }));

  // 4. Process Pricing Array
  const pricingList = Array.isArray(listing.pricing) ? listing.pricing : [];

  // 5. Build Map Query
  const fullAddress = `${listing.address}, ${listing.city}, ${listing.state} ${listing.pincode}, ${listing.country}`;
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="pt-32 pb-16 max-w-7xl mx-auto px-6">
      <PropertyGallery images={displayImages} title="Gallery" />

      {/* Main Content 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Identity & Header */}
          <section>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {listing.badge && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-[12px] uppercase rounded-full">
                  {listing.badge}
                </span>
              )}
              <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-[12px] uppercase rounded-full">
                {listing.propertyType}
              </span>
              <span
                className={`px-3 py-1 font-bold text-[12px] uppercase rounded-full ${
                  listing.status === "AVAILABLE"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {listing.status}
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">
              {listing.title}
            </h1>
            <p className="text-lg text-slate-500 flex items-center gap-2">
              <MapPin className="text-blue-600 shrink-0" size={20} />
              {fullAddress}
            </p>
          </section>

          {/* Key Specs Row */}
          <section className="flex flex-wrap items-center gap-8 py-6 border-y border-slate-200">
            {keySpecs.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      {spec.label}
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {spec.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Estate Description */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              About this Property
            </h3>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4 leading-relaxed whitespace-pre-wrap">
              {listing.description}
            </div>
          </section>

          {/* Area Metrics Grid */}
          {measurementsList.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Property Measurements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {measurementsList.map((metric, index) => (
                  <div
                    key={index}
                    className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm"
                  >
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {metric.value}{" "}
                      <span className="text-sm font-normal text-slate-400">
                        sqft
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Structured Inclusions List */}
          {listing.inclusions && listing.inclusions.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Premium Inclusions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {listing.inclusions.map((inclusion: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-emerald-500 shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-slate-700 font-medium">
                      {inclusion}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sticky Pricing & Tools */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Pricing Block */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">
                  Asking Price
                </h4>
                <p className="text-4xl font-extrabold text-blue-700 tracking-tight">
                  {formatPrice(listing.price)}
                </p>
              </div>
              <span className="bg-blue-50 text-blue-700 p-2 rounded-xl">
                <TrendingUp size={24} />
              </span>
            </div>

            {/* Render dynamic pricing array if populated */}
            {pricingList.length > 0 && (
              <div className="space-y-3 mb-8">
                {pricingList.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm py-2 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-slate-500">{item.label}</span>
                    <span className="font-bold text-slate-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div
              className={`space-y-3 ${pricingList.length === 0 ? "mt-8" : ""}`}
            >
              {listing.brochureUrl && (
                <Link
                  href={listing.brochureUrl}
                  target="_blank"
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Download Brochure
                  <Download size={18} />
                </Link>
              )}
              <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
                Enquire Now
              </button>
            </div>
            <p className="mt-6 text-[10px] text-slate-400 leading-relaxed italic text-center">
              *Disclaimer: Prices and availability are subject to change.
            </p>
          </div>

          {/* Floor Plan Section */}
          {listing.floorPlanUrl && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-900">Floor Plan</h4>
                <Link
                  href={listing.floorPlanUrl}
                  target="_blank"
                  className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline"
                >
                  Full View
                  <ExternalLink size={16} />
                </Link>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-center border border-slate-100 group">
                <img
                  alt="Floor Plan Thumbnail"
                  className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
                  src={listing.floorPlanUrl}
                />
              </div>
            </div>
          )}

          {/* Mortgage Calculator */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="text-blue-600" size={24} />
              <h4 className="font-bold text-slate-900">Mortgage Calculator</h4>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <input
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 border-none outline-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600/20"
                    type="text"
                    defaultValue={Number(listing.price) / 100}
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Down Payment
                  </label>
                  <div className="relative">
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      %
                    </span>
                    <input
                      className="w-full px-4 py-3 bg-slate-50 border-none outline-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600/20"
                      type="number"
                      defaultValue={20}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Interest Rate
                  </label>
                  <div className="relative">
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      %
                    </span>
                    <input
                      className="w-full px-4 py-3 bg-slate-50 border-none outline-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600/20"
                      type="number"
                      step="0.1"
                      defaultValue={5.8}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Loan Term
                </label>
                <select className="w-full px-4 py-3 bg-slate-50 border-none outline-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600/20 appearance-none cursor-pointer">
                  <option value={30}>30 Years</option>
                  <option value={25}>25 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={15}>15 Years</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Map & Features Section */}
      <section className="mt-16 mb-16">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">
          Location & Features
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Dynamic Google Maps Iframe */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden h-[400px] border border-slate-200 shadow-sm relative bg-slate-100">
            <iframe
              src={mapUrl}
              className="w-full h-full border-0 absolute inset-0 z-10"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Features Grid */}
          <div className="space-y-4">
            {listing.features && listing.features.length > 0 ? (
              listing.features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-blue-600" size={20} />
                    <h5 className="font-bold text-slate-900">{feature}</h5>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-500 text-sm">
                No additional features listed.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
