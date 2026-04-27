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
  GraduationCap,
  ShoppingBag,
  Train,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { getPropertyById } from "@/lib/firebase/services";

// --- DYNAMIC DATA ARRAYS ---

const KEY_SPECS = [
  { icon: BedDouble, label: "Bedrooms", value: "4 Beds" },
  { icon: Bath, label: "Bathrooms", value: "2.5 Baths" },
  { icon: Car, label: "Garage", value: "2 Cars" },
  { icon: Calendar, label: "Reg. Date", value: "Oct 2024" },
];

const MEASUREMENTS = [
  { label: "Total House", value: "242.4" },
  { label: "Land Size", value: "450.0" },
  { label: "Living Area", value: "184.2" },
  { label: "Garage", value: "36.8" },
  { label: "Alfresco", value: "16.4" },
  { label: "Porch", value: "5.0" },
];

const INCLUSIONS = [
  "2590mm raised ceiling heights",
  "Ducted Air Conditioning throughout",
  "20mm Caesarstone to all cabinetry",
  "LED Downlights throughout house",
  "Turf & Landscaping package",
  "Driveway & Exposed aggregate path",
  "Colorbond steel roof with sarking",
  "6-Star energy efficiency rating",
];

const FINANCIALS = [
  { label: "House Build Price", value: "$415,000" },
  { label: "Land Price", value: "$430,900" },
  { label: "Rental Estimate (pw)", value: "$780 - $820", highlight: true },
  { label: "Yield Range", value: "4.8% - 5.1%" },
];

const AMENITIES = [
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Emerald Creek State College (800m), Saint Joseph's College (2.1km)",
  },
  {
    icon: ShoppingBag,
    title: "Shopping & Dining",
    desc: "Westfield Coomera (4.2km), Local Village Shops (1.2km)",
  },
  {
    icon: Train,
    title: "Transport",
    desc: "Coomera Train Station (4.5km), M1 Highway Access (3min)",
  },
];

type Params = Promise<{ slug: string }>;

export default async function PropertyDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const property = await getPropertyById(slug);

  return (
    <main className="mt-20 max-w-7xl mx-auto px-6 pt-8">
      {/* Image Gallery Grid */}
      <section className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] mb-12">
        <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl relative group cursor-pointer">
          <img
            alt="Property Main"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv2Fn7C1RlP-C9mdHFxM8anLRUWevRD6nRBh88U1KYyv4vlq9FVQlgSdolbL1eZ-Z82EU51St2dFsP31ntYFpK82Gwv72ZabxM5ksjzxUC3cRxuddsjTYIe3jRYJf7L6v6o5i6Upq7T1G0X8F5gEDlTDH4UmvIx5AU0hmD064MFKMQYZyAWREqTXqPjVo4ZV_qWumvm9KX2XQ-MbJGOtrSjb2cg5hO7e_eXM4svKDFcw2fQQ7eNCmIJATIozaEHwsvIOfk-jFgY7I"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl relative group cursor-pointer">
          <img
            alt="Interior 1"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAInAllqHO3KffQd7bQIM8IXLrAXRxVfj9KQXQ4Yjh0UTFaAMh7DMG27elA_sIrIJ5Hvus7aRfSO6qa133uH8O240oouNtvicXwfnsEk7PeQsGzTpDqgocPvj3SuQC55wsSTEud7Md9OpFpRib2vNeyltKBN6ocmahTET1ZMipjGcl2mpM99T68w8QR6nB4JnauPmk9-VfMfRAiErtO4irVOEFiHFRiDT8CuKpc35aOXM8Q7ICvjbIxsVChbfUHm2mwopcUeK1OTlQ"
          />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl relative group cursor-pointer">
          <img
            alt="Interior 2"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEa3yTIfmTjK2CyoFccJh05ka1XlEUlDfo-TfXgdUgEVHIYB8Rg5AcWxbu6-YdLyU0PCPsN_-hp8yzJKPkHwk1VU6fDj4RzDp_K4i13JiW3_TVmXdX4DoEA0i24JS3mx74HCJh721Lw7drvYj25TMUkSsLE3zSBW42dCaltwR3CkSnD-zlnCWX9hPHVuoX4VS33o02GTDSXyqbQeCzaEV58Q7tkXfpn_FSYMFw6MACd7-ysM5AI4N_0q15m5z8UdfCjspm9gWM7mY"
          />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl relative group cursor-pointer">
          <img
            alt="Interior 3"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO3WNf26RDaWmPmuAbrUlPmNsfI2zzNfT9ZbdKvzDfd0d6v7ryeGc8gPD5SEgeLwmBUUk51RhsXbi7SV4MidJOMjcyavg7qkrXMY_ew6OBO78uOlUk8hZx04wOkvQ-kG52cXF_ZeZ1I87J4s5jsuCDp-gehY5Tq6wnqZB0BQacWHiiB9wtPE3KHJhMfdOE1zOYpMDs_qbfFF2G5LIqP2Q3DgOY64WotYvMIkMdR4WEnW4U2nGxkD4QYiphqubIcn-BHS6Z69gTqUw"
          />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl relative group cursor-pointer bg-slate-900 flex items-center justify-center">
          <img
            alt="Interior 4"
            className="w-full h-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuByn4T8frKDsCrrXRo_r_UU3ct5Qhk36hpZ2xbs1h3MsQkDofZ1KGozKT3-lNT9ROgqa4KmcgPLMkum7JmermcTy816zdZQOaXDEmf3oDXaWahgzTkCqs8zNHcn16W1OfAAfwss13EhS3fZ_OkIyszrVsk3W5TblC6JWDjzwE6xzpE1mFSbDGIaOUASd5EuaQNUugYkwTTqKa1G1sb-1apQl8e97cqt1QuEX1GEI4lEaatCKlTG7nQito4Xk2HQXaFE_JepRjNfpEQ"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <LayoutGrid size={32} />
            <span className="font-bold text-sm mt-2">+12 More Photos</span>
          </div>
        </div>
      </section>

      {/* Main Content 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Identity & Header */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-[12px] uppercase rounded-full">
                New Construction
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 font-bold text-[12px] uppercase rounded-full">
                Full Turn Key
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">
              The Azure Residence
            </h1>
            <p className="text-lg text-slate-500 flex items-center gap-2">
              <MapPin className="text-blue-600" size={20} />
              Lot 412, Emerald Creek Estate, Upper Coomera QLD 4209
            </p>
          </section>

          {/* Key Specs Row */}
          <section className="flex flex-wrap items-center gap-8 py-6 border-y border-slate-200">
            {KEY_SPECS.map((spec, index) => {
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

          {/* Area Metrics Grid (Bento Style) */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Property Measurements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {MEASUREMENTS.map((metric, index) => (
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
                      m²
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Estate Description */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              About this Home
            </h3>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
              <p>
                This architecturally designed masterwork represents the pinnacle
                of modern suburban living. Situated in the prestigious Emerald
                Creek Estate, The Azure Residence combines sustainable building
                practices with high-end aesthetic finishes. The open-plan layout
                facilitates a seamless transition between indoor comfort and
                outdoor entertainment.
              </p>
              <p>
                Boasting a gourmet kitchen with stone waterfall island benches,
                premium SMEG appliances, and a walk-in butler's pantry, this
                home is designed for those who appreciate the culinary arts. The
                primary suite serves as a private sanctuary, featuring a
                sprawling walk-in robe and a spa-inspired ensuite with brushed
                nickel fixtures.
              </p>
            </div>
          </section>

          {/* Structured Inclusions List */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Premium Inclusions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
              {INCLUSIONS.map((inclusion, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2
                    className="text-emerald-500 shrink-0"
                    size={20}
                  />
                  <span className="text-slate-700">{inclusion}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Pricing & Floor Plan */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Pricing Block */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">
                  Total Investment
                </h4>
                <p className="text-4xl font-extrabold text-blue-700 tracking-tight">
                  $845,900
                </p>
              </div>
              <span className="bg-blue-50 text-blue-700 p-2 rounded-xl">
                <TrendingUp size={24} />
              </span>
            </div>

            <div className="space-y-3 mb-8">
              {FINANCIALS.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm py-2 border-b border-slate-50 last:border-0"
                >
                  <span className="text-slate-500">{item.label}</span>
                  <span
                    className={`font-bold ${item.highlight ? "text-blue-600" : "text-slate-900"}`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Download Brochure
                <Download size={18} />
              </button>
              <button className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-colors">
                Enquire Now
              </button>
            </div>
            <p className="mt-6 text-[10px] text-slate-400 leading-relaxed italic">
              *Disclaimer: Prices are subject to final site costs and council
              approvals. Figures provided are estimates based on current market
              data and building quotes.
            </p>
          </div>

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
                    defaultValue="845,900"
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
                      type="text"
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
                      type="text"
                      defaultValue="5.8"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Loan Term
                </label>
                <select className="w-full px-4 py-3 bg-slate-50 border-none outline-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-600/20 appearance-none">
                  <option value={30}>30 Years</option>
                  <option value={25}>25 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={15}>15 Years</option>
                </select>
              </div>
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
                  Estimated Monthly Payment
                </p>
                <p className="text-3xl font-black text-blue-700 tracking-tight">
                  $3,975
                </p>
              </div>
            </div>
          </div>

          {/* Floor Plan Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-900">Floor Plan</h4>
              <button className="text-blue-600 text-sm font-bold flex items-center gap-1">
                Full View
                <ExternalLink size={16} />
              </button>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-center border border-slate-100 group cursor-zoom-in">
              <img
                alt="Floor Plan Thumbnail"
                className="w-full rounded-lg transition-transform duration-300 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg5aHLjjBhuD8lZxLpO1llWnlnGqwnQvjNH0nx-DhBLU8pMTjW7m8FpsvhXadmkcoxus02ClQO-IzZlU2aa0e9v0N1cITKePtYWPuBWaeBWPh6xavmAsE0nHZA6P8iMOTZdMmZlcBnLAHZj65Q4LJVJr1LOuusB4DqCAKS0ZYLTyyVN7U4YGdVn7xcYe5D08HTHZ6boOuKc8cszx9YFu0sx_PN7W73eA8_VMyQ9NH-vBzHuJ9VXV73ptWs1lGx9DeGL0iJjqvNpZo"
              />
            </div>
            <p className="mt-4 text-xs text-slate-500 text-center">
              Version 2.4 - North Facing Layout
            </p>
          </div>

          {/* Contact Agent Small */}
          <div className="p-6 bg-slate-900 rounded-2xl text-white">
            <div className="flex items-center gap-4">
              <img
                alt="Agent"
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5Pp-mElSdBqIJ5PD5lRDRdCWsTfGh46vG8z8XbF7JV1c49UxSgKUi_ck7co6gqwZBNVJqDwTbSBr30ZmIlOdNQF3xh6pHeThxBflPUW4RTPbj9KR2S6lCBh4ibMlC-t8_65-tMjuMMFY5OuEQnfQ7ItNj4idcJo-NyjAXajvm_3qIhCNkdaLNZu33grK1q5rxkD6o8uaNhCd9ehZ4u_r4OYGpSZyqrhLLGFEfEf5AU3z4l8ey1wJ7bdrCMRQLGJGqbTBRajPI53Y"
              />
              <div>
                <p className="font-bold text-lg leading-tight">
                  Marcus Sterling
                </p>
                <p className="text-slate-400 text-sm">
                  Senior Property Advisor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Map Section */}
      <section className="mt-16 mb-16">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">
          Location & Lifestyle
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Google Maps Iframe */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden h-[400px] border border-slate-200 shadow-sm relative bg-slate-100">
            <iframe
              src="https://maps.google.com/maps?q=Upper%20Coomera%20QLD%204209&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 absolute inset-0 z-10"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-4">
            {AMENITIES.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-white border border-slate-100 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="text-blue-600" size={20} />
                    <h5 className="font-bold text-slate-900">
                      {amenity.title}
                    </h5>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {amenity.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
