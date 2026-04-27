import Image from "next/image";
import {
  Sparkles,
  MapPin,
  Building2,
  Banknote,
  Search,
  ArrowRight,
  Palmtree,
  Home as HomeIcon,
  Map,
  Heart,
  Bed,
  Bath,
  Square,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";

// --- DYNAMIC DATA ARRAYS ---

const CATEGORIES = [
  { title: "Apartments", count: "1,240 Properties", icon: Building2 },
  { title: "Villas", count: "850 Properties", icon: Palmtree },
  { title: "Townhouses", count: "420 Properties", icon: HomeIcon },
  { title: "Land", count: "180 Properties", icon: Map },
];

const FEATURED_PROPERTIES = [
  {
    id: 1,
    title: "Azure Bay Villa",
    price: "$2,450,000",
    location: "Malibu, California",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpsqdYMjbyWnmrqwbc-mjvsApUjbhMf6HrbaTEJvRRAcVcQFL3BPRXOwVdsQhDByHEqCMJb0e0Ja4kpCLHGVCFhQTIswLceQkdpidQ5JqxQiycuOMNBlTPaUJe-EksY-HBTDpLPTycC6v12fZdQ3SVyRN2YEI-ByVt0Zv3ETUH7cpOp-iHHLSr8ycx9eJTTrb3v8PfTByNVgIhPAN4nBsqTlfYR3cbHgun0_dwV1Agzr473iZw471IeF6XxB9jV_DSRUybF9T0jNg",
    alt: "ultra-modern luxury white architectural villa with swimming pool and panoramic windows at dusk",
    badgeLabel: "FOR SALE",
    badgeStyle: "default", // White background
  },
  {
    id: 2,
    title: "Horizon Loft",
    price: "$1,890,000",
    location: "Downtown Miami, FL",
    beds: 3,
    baths: 3,
    sqft: "2,800",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9ML5H6r4wMXnp1Wzc6CytT2A55jNdEGSlcpOvkUjcC3BhZ2sCugy6wWTOOmqWbjFrVCPJsASotrUl3hZsYR9zG5dkZItDmsh6O006FQf-FGfWf8Ox8-m49tReZLqvbktE58D74KFVAQDVnwLaxypiynCY-NHbMiLcoF1qqi7QKjNrjv9yiph0BTiNmvanXft10MFeDeSVOBEny-MvEF7iNqfC4I0Hsr9UB51YcjW4F6RU1EwV8WiD3RmLynQUhEDC7eca1su8VOI",
    alt: "contemporary glass and concrete penthouse overlooking a sparkling cityscape at sunset",
    badgeLabel: "NEW CONSTRUCTION",
    badgeStyle: "primary", // Blue background
  },
  {
    id: 3,
    title: "The Glass House",
    price: "$3,200,000",
    location: "Beverly Hills, CA",
    beds: 6,
    baths: 5,
    sqft: "5,500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVASIctOgadbxOdRK0LI_DqtTP9iMHXdy__vAEnJoKnvaQhrA5zgTHENB80KM2Bx0m-FnYKp9ohPT3fJmbTszAJT7-5APCyZ4NdVB4wtq8Uxg16WBFZ11e5N9a5H_PXpS4lNAnh95YuwGGrlJTepljbN8JzFzaozicrmtnnl7Y2ggw_qXE-RHwCNHDFXzgWr-NsMV00p5UUOQ6Kdxyfdqy1JuzxHQtD4YJABrWsGc2cFWOds0UzRUMhYNiG4WK6qVKuk-n1Rh8zxw",
    alt: "spacious minimalist estate with expansive manicured lawn and geometric swimming pool",
    badgeLabel: "FEATURED",
    badgeStyle: "default",
  },
  {
    id: 4,
    title: "Stone Oak Estate",
    price: "$1,250,000",
    location: "Austin, Texas",
    beds: 4,
    baths: 3,
    sqft: "3,100",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnXYyCNoR4CKgjovCaSATzcQr8OiwhilGKWXk2RixJSK8iQ-XOzxNNC0obvMMPus6DGXjoXzWEHoezOmA9lzPi6RmEHKh145WS8cyuOYYtQKO4HAYOqpY8fr_1SgRTrAx6YJBo8RUSO46fiRb6uEvB_r5ZYlsge-ClhV_KS0y7QV0JmLO1Y8OEnIy-C8M5d1rkjvo-N1lAEG8CCa_V39liuAxT4U78jKEzyv_sz33bsXgscw9cmLs9gZRS6JJnBfLNY6NWMko0pvw",
    alt: "stunning luxury manor with stone facade and large arched windows",
    badgeLabel: "FOR SALE",
    badgeStyle: "default",
  },
  {
    id: 5,
    title: "Urban Edge Townhouse",
    price: "$980,000",
    location: "Seattle, WA",
    beds: 3,
    baths: 2,
    sqft: "1,950",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDF6idF-QSlZ8LsffDLBQUBAEGSlcZWEm6hnuN-DXNDfNDprOlRdhjbFuqZC_PG-QmHccMID_46Ghyj6Ot-35C3ULWCCINtBM8s1XueEQlyEYnEmrLv56AcU8fuKvwYKesOiKHRBX7wty9hk4E_IOU3YtIHHGtG8gf7GVS_hRKraeYHNz56HupqdqNBXek94cZBB4C17ySKUyJckmu8GA0auXQvQ_LVAOuiKRGR0Vq7WQPK6uV-lPqOfJ_krFCkgBBKBA6Ok9_KkCc",
    alt: "sleek white modern townhouse with vertical wooden slats and large balcony",
    badgeLabel: "FOR SALE",
    badgeStyle: "default",
  },
  {
    id: 6,
    title: "Marbella Paradise",
    price: "$4,100,000",
    location: "Scottsdale, Arizona",
    beds: 7,
    baths: 6,
    sqft: "6,800",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2Rl7khN6Pbsd0NA0dSXU0-OR5E-vw2NYlGbC4shEMAgQ2YutUTm8HIQkswSdonIbpqA5gGGilWMsHnomEgvtZUScjR7xKOV68QfOikjAOMGj5H-EmSBm3mrINOGlKv0yaFpNVvwRkp0bmc1YEgUVGyCXTcpN7bQuUz53xfS9oFvVwbZJ3oJxVqbXsbSPLzN72CQaV-MqwBVIlc0oQdEuSsG41H9PBfTaPs3WXEIM4Gmz-TymVb_pCCBbb77ItUSHJLeh2WAYZQP4",
    alt: "sprawling mediterranean style villa with terracotta roof and lush garden",
    badgeLabel: "EXCLUSIVE",
    badgeStyle: "primary",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/10 text-primary mb-6 animate-fade-in text-blue-600 bg-blue-50">
            <Sparkles size={16} />
            <span className="font-caps-xs text-caps-xs font-bold tracking-widest text-xs">
              DISCOVER PREMIER REAL ESTATE
            </span>
          </div>
          <h1 className="font-h1 text-h1 text-on-surface mb-6 max-w-3xl mx-auto text-5xl font-bold text-slate-900 tracking-tight">
            Find your dream home in the perfect location
          </h1>
          <p className="font-body-lg text-body-lg text-slate-500 mb-12 max-w-2xl mx-auto text-lg">
            Explore thousands of premium listings from luxury villas to modern
            apartments, curated just for you.
          </p>

          {/* Search Bar */}
          <SearchBar />
        </div>
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-bl from-blue-600 to-transparent rounded-full blur-3xl" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Explore by Category
              </h2>
              <p className="text-slate-500">
                Tailored collections for every lifestyle choice.
              </p>
            </div>
            <button className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:underline">
              View All Categories <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    {category.count}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
            <div>
              <span className="text-blue-600 font-bold text-xs mb-2 block uppercase tracking-widest">
                Handpicked Selection
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                Featured Luxury Properties
              </h2>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:border-blue-600 transition-colors">
                Newest
              </button>
              <button className="px-6 py-2 rounded-full border border-blue-600 bg-blue-50 text-blue-700 font-semibold text-sm">
                Popular
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROPERTIES.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={property.alt}
                    src={property.image}
                  />
                  {/* Dynamic Badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider shadow-sm uppercase ${
                      property.badgeStyle === "primary"
                        ? "bg-blue-600 text-white"
                        : "bg-white/90 backdrop-blur text-blue-700"
                    }`}
                  >
                    {property.badgeLabel}
                  </div>
                  <button className="absolute top-4 right-4 bg-white/20 hover:bg-white backdrop-blur h-10 w-10 rounded-full flex items-center justify-center text-white hover:text-red-500 transition-all">
                    <Heart size={20} className="fill-current stroke-current" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {property.title}
                    </h3>
                    <span className="text-blue-600 text-xl font-bold">
                      {property.price}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-6">
                    <MapPin size={16} />
                    {property.location}
                  </p>
                  <div className="flex justify-between py-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Bed size={18} className="text-blue-600" />
                      <span className="text-sm font-semibold">
                        {property.beds} Beds
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Bath size={18} className="text-blue-600" />
                      <span className="text-sm font-semibold">
                        {property.baths} Baths
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Square size={18} className="text-blue-600" />
                      <span className="text-sm font-semibold">
                        {property.sqft} sqft
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <button className="px-10 py-4 bg-white border border-slate-200 text-slate-800 font-semibold text-sm rounded-2xl hover:bg-slate-50 hover:border-blue-600 transition-all shadow-sm">
              Show More Properties
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-600/30">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-[100px]" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-6 max-w-2xl mx-auto tracking-tight">
                Stay updated on the latest property listings
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
                Join 10,000+ homeowners and investors who receive weekly market
                reports and exclusive early-access deals.
              </p>
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <input
                  className="flex-1 px-6 py-4 rounded-2xl border-none focus:ring-4 focus:ring-white/20 text-slate-900 font-medium outline-none"
                  placeholder="Your email address"
                  type="email"
                />
                <button className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all active:scale-95 shadow-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
