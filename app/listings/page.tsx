import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  ChevronLeft,
  ChevronRight,
  Filter,
  Car,
  Waves,
  Home as HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { getAllProperties } from "@/lib/firebase/services";

// Extracted static data to map over.
// Once your Firebase data is ready, you can replace this with the 'properties' array.
const STATIC_PROPERTIES = [
  {
    id: 1,
    title: "Horizon View Estate",
    price: "$2,450,000",
    location: "Malibu, California",
    beds: 4,
    baths: 3.5,
    featureValue: "3,200",
    FeatureIcon: Square,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMkaHFRbdfnU0L86hA8JaAhNrwRXaK4XWBXvAOjrrKyUuR6U0yo0hyJF-P2neMTasC2GHoxzZ-MwAL673fnBd92Zf-mVZSFx8w28CRJM46E-4L28hg_wz8Rgqu9g8S4W_nJ9GqKqlWjaJut6SDoUeaDYHDOb0DD9LLKddVIKeF8IVvc1k-XRcr1tAhyvZIOgEifu9vri4EbHjcjzmHhQd4ZV9BPAGMd-h-md8J3Q7C_vz6IBf3p2LdQiz99rIsHWppWcOpEb9Uz1w",
    alt: "Modern architectural villa with glass walls and a infinity pool at sunset",
    badgeLabel: "New Listing",
    badgeColor: "bg-blue-600 text-white",
    tag: "For Sale",
  },
  {
    id: 2,
    title: "Modern Serenity Villa",
    price: "$1,890,000",
    location: "Beverly Hills, CA",
    beds: 5,
    baths: 4,
    featureValue: "2",
    FeatureIcon: Car, // Using Car icon for garage
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDC4MjShxPPShSmbn6NhJLgzUfYpePbDFyxlMo5FFW19DkYvX7MaQhuytYmMYuBtDBzG9jfVwMLUezgpmHyTMP9M4L2NzQejob4IpW4fBwz9EcGThzw4krhi_iX3s0d5lXRYwNV6p05s_WMYCcTGwhqyCSnSe2L8JHacc9oXBD3HTBQwg8aBw2TEkzIdXuKS5uMfFGWtWHAZCgVvsEcm44CpSFANUadE68XTkq56WlRtMWlYwYGuOvjK7K9hRa5BEhHgVUGVePSow0",
    alt: "Luxury kitchen with marble island and high-end wooden cabinetry",
    badgeLabel: "Premium",
    badgeColor: "bg-emerald-500 text-white",
    tag: "Featured",
  },
  {
    id: 3,
    title: "The Redwood Retreat",
    price: "$950,000",
    location: "Lake Tahoe, CA",
    beds: 3,
    baths: 2,
    featureValue: "2,100",
    FeatureIcon: Square,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBO0VgzBA3bFNKMGLHnwSyi0IM6-P20IZXB0qSei1bcr40BFWERLeuJ8FSYyjZNZOV5TeO31GxWn4wMeq8jXRo2ZqgZdnH2gsP7eoBI67bh4de96KB4RnCCUz05CNHbahkKA2V4bBp-c4Zgv9iiZVNfB43CudMncDK_-db4waRhDGV-6D4GdAM27qwV8zG7QFKlqL3ovHooLSet2VUVzucYMQE6pYF3THBnRure9Mv73J-CjVThTho-Xgiu6WJ-jjFSAgLeCcxFQxM",
    alt: "Cozy modern living room with fireplace and floor to ceiling windows",
    badgeLabel: null,
    badgeColor: "",
    tag: "Price Cut",
  },
  {
    id: 4,
    title: "Grand Regency Palace",
    price: "$5,700,000",
    location: "Atherton, CA",
    beds: 7,
    baths: 9,
    featureValue: "Yes",
    FeatureIcon: Waves, // Using Waves icon for Pool
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq-2IFyOOoZnvIbb8Gi7mTq9HuYE3vCrEk8SXf4yhQhVGgtj85-aFLHdnX9ihf9QxTPJmFY0cBiqukEdouomLEFWduq5zj_TH2M3XIND3rvN66U-HN8nESRuK1cx99YNS1jSMPWqQd-z1N0VVtTJn4uG6b9XO99Sy5Zgk4wQFDP-cn1wOaGlzbXEp6-buUSmQgO12VpM5dHHEkzG2U4gpGFrXMaWW_s61UjLnBuAmhjAPGQujIEHK7Vons8vW2DKxHfM3gYbpPhbA",
    alt: "Palatial white mansion with extensive manicured gardens",
    badgeLabel: null,
    badgeColor: "",
    tag: "Luxury",
  },
  {
    id: 5,
    title: "Neo-Minimalist Cube",
    price: "$1,250,000",
    location: "San Diego, CA",
    beds: 4,
    baths: 3,
    featureValue: "2,800",
    FeatureIcon: Square,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcN4MGB9youo3FaRgHxgGzZlG_s-oCi71DQwS_BGzEYoTDA5aPMHebuxLDLsJOj6Wcc0p9SLH7bS9ptJW6hysl3dFRkopoYYLQRHpiN4nKJ6HCLjHMkwPuxE23JA7L1NfbnScvxv17vuezLu0ktzAlvczrCwG0GKfojw4_B2VP-z5-Lp_Kg3OcT5-DOnL_xjvJUl72S4nQ_491HDL4WZkCWTIPTZlaJHFCYVlLaq36O4BTmiKeM8HQn0Pqn1FhIokd4DEhZp0DKKg",
    alt: "Sleek black and white contemporary house facade",
    badgeLabel: null,
    badgeColor: "",
    tag: "Modern",
  },
  {
    id: 6,
    title: "Heritage Oak Cottage",
    price: "$680,000",
    location: "Pasadena, CA",
    beds: 3,
    baths: 2,
    featureValue: "1,850",
    FeatureIcon: HomeIcon,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDJQ5MSokuQ0mEQb40eKzpalSGMcvOuTRFYBSMtRsdCsQ23OM8IPJe6waRNEMAbjuDi34NeEA2IQg9vPHm2X-lODwBwlJF8oHYdU6PqU4QoeyaEzGbt1PRtUCf2s6KN66yr8vclB6yq48vZDtfcg5_OwedTZkNVxpx5Sertb7DtVspjcFy8R1M_SxGbhzSxCl1PKVk6ILEl59XIQoNZwlEr5JBa_9wjK0xxxcMk4SnHKXvUyHRv6MrWwUerZcXXThrOiztoCFKzfM",
    alt: "Traditional red brick house with white trim and a lush front lawn",
    badgeLabel: null,
    badgeColor: "",
    tag: "Classic",
  },
];

export default async function ListingPage() {
  // You can map over this variable instead once your Firebase schema matches!
  const properties = await getAllProperties();

  return (
    <main className="pt-32 pb-16 max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sticky Filters Sidebar */}
        <aside className="w-full lg:w-72 lg:sticky lg:top-28 space-y-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Filter className="text-blue-600" size={24} />
              Filters
            </h3>
          </div>
          <div className="space-y-6">
            {/* Location Search */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">
                Location
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-sm outline-none"
                  placeholder="Search city, neighborhood"
                  type="text"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">
                Property Type
              </label>
              <select className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-sm appearance-none outline-none cursor-pointer">
                <option>All Properties</option>
                <option>Modern Villa</option>
                <option>Apartment</option>
                <option>Townhouse</option>
                <option>Commercial</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-500">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  className="w-1/2 px-4 py-3 bg-slate-50 border-none rounded-xl text-sm outline-none"
                  placeholder="Min"
                  type="text"
                />
                <span className="text-slate-400">—</span>
                <input
                  className="w-1/2 px-4 py-3 bg-slate-50 border-none rounded-xl text-sm outline-none"
                  placeholder="Max"
                  type="text"
                />
              </div>
              <input
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                type="range"
              />
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">
                Bedrooms
              </label>
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                  1+
                </button>
                <button className="flex-1 py-2 text-sm font-medium border border-blue-600 text-blue-600 bg-blue-50 rounded-lg">
                  3+
                </button>
                <button className="flex-1 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
                  5+
                </button>
              </div>
            </div>
          </div>
          <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all active:scale-[0.98]">
            Apply Filters
          </button>
        </aside>

        {/* Listings Section */}
        <section className="flex-1 w-full">
          {/* Sorting & Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Premium Listings
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Showing {STATIC_PROPERTIES.length} exclusive properties in
                California
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                Sort by:
              </span>
              <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer min-w-[160px]">
                <option>Newest Listings</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {STATIC_PROPERTIES.map((property) => {
              const DynamicIcon = property.FeatureIcon;

              return (
                <div
                  key={property.id}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={property.alt}
                      src={property.image}
                    />

                    {/* Render badge only if it exists in the data */}
                    {property.badgeLabel && (
                      <div className="absolute top-4 left-4">
                        <span
                          className={`${property.badgeColor} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}
                        >
                          {property.badgeLabel}
                        </span>
                      </div>
                    )}

                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                      <Heart
                        size={20}
                        className="fill-current stroke-current"
                      />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-blue-700">
                        {property.price}
                      </h4>
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase">
                        {property.tag}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                      <MapPin size={16} />
                      {property.location}
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Bed size={18} className="text-blue-600" />
                          <span className="text-sm font-semibold">
                            {property.beds}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Bath size={18} className="text-blue-600" />
                          <span className="text-sm font-semibold">
                            {property.baths}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <DynamicIcon size={18} className="text-blue-600" />
                          <span className="text-sm font-semibold">
                            {property.featureValue}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-colors">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-colors">
              3
            </button>
            <span className="px-2 text-slate-400">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-colors">
              12
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
