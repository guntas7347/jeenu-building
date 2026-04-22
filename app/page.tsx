import Image from "next/image";
import { MapPin, Building, ArrowRight, Bed, Bath, Square } from "lucide-react";

const stats = [
  { value: "$14.2B", label: "Portfolio Managed" },
  { value: "240+", label: "Exclusive Estates" },
  { value: "18", label: "Global Regions" },
  { value: "0.1%", label: "Acceptance Rate" },
];

const smallFeaturedListings = [
  {
    title: "Aurelian Penthouse",
    location: "New York City",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_CgnqUEVZcdz3YWFhU5J4ui2Cxvmk2Y5HRdWtjk85abvTg_I0DMpEJcHqinxgRqJxrrG59QKNqaf4kHepuyf73CVLGxlKUafxWLYlgaoCgFAx4FQXOi4O6qoNLiyqu8YGhMNYTU32NFocOpNdFZwvQxGcg4FKQeGHS2Gdnx_ZVu0LHgYVkekyfBkiQrz-9oVUhxlHmbm9Q6H-s8Fs_yP9WmiWUS9e354bSHtuG_kruXBQfCc7x_3Q3XfPs9TQPuc3mBjr7YivSmlj",
    alt: "luxurious interior of a high-end apartment with designer furniture, gold accents, and a panoramic city skyline view",
  },
  {
    title: "Villa Mediterranean",
    location: "Monaco",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQr3aiQTJYjG9hzvK4UtZcUoCYvRlRFt8s00sYvxcuDLSZX6pYHtl2rRvw89vqvHPOwxt2voT25jfK1W_4FbfZrqZhDIF_elBWk7YPxZ0bBPnMvosnBAtkgHSBUI1HLkZd9tyNXeNx1td9uNGEUa0t4-RP3Y6AwRX9Llpzdyl6CFoV-dP_V31En2Vm85_VerKJmVTiFAmCxYhco7-pRjJEO4qKX8N0uzdR5mGTsUoZnOxuqVY3oghaF7zMtcZ8qZxBOcLkkuQiV5YV",
    alt: "mediterranean style white villa with archways and terracotta tile roof surrounded by bougainvillea and palm trees",
  },
];

const popularLocations = [
  {
    name: "Paris",
    count: 12,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMF_3UqpqlmdRptsjEfn47CoRyO1IptmZaZX0OR0Xb1zqu0vejNH64vyX7WkPkMOBjPk5th3POo9leDUSIIjGjQfSXi2jQMZSotYtX3oJ0fz-x0Ox429oEwqpK_XleIHHXTEZLIZiE-AczL67cRHolok6o5DFsA_jOoubBLrHHcUa5GsYh5WrnaqKBQY2OyzHpzqurZf0Aud952D7dOrcuCvBYPUaurfSiJmbtSLH2v6Fy45MdpaYV0l9Zkf44_7P_SZxDB2bSBqjW",
    alt: "view of the eiffel tower through a classic parisian window with soft evening light",
  },
  {
    name: "New York",
    count: 85,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtuVITjTEWTkera84RRNidZFIuWV0KEZW9zTsj6tQOxmLwEnrxLIqTXTl_e9Gu1n_-BeEFgJjmxNT2FpLgNlKcb1zdVAfLDNx3EUYbvl-pwLzWLjkt1upxuI3EuiIv_IFcDOmgGiPRAL-JJPmRaGZXJCrt2SNOu7-i57cqqP6BBL_FoGDsEl8ikCvWfUX617b80KC9VZipD3brsTdsbyIXz37QiC8oMAgH-daGomI7YkoKAMdFSToj8Ry5nvtFFn38kqEy3dTxxz3I",
    alt: "new york city street view at night with bright neon lights and traffic streaks",
  },
  {
    name: "Dubai",
    count: 31,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjHFizoz2fVd0AkqSJ2M9nArG7WlC9yOHQCM9l16pN4sp9mLbtyg_IGsswtPOyxJOHNyeEgix7yBmGuBbDPVPhgxa4LKJ6_lHnvU_sRpawo48Fi6Jvq-IUsclNDqA3N-U3Uk40Tq1uA7YKC-K1Vey_Iu5yddG7wCeCnTVc9DUifivemLySc19SHkh2PKEl22C-9UfuOd1ZMIWxu0RHbT_-hcvxsm7XymwDxX-WUflaM6kGM2rWQ3De0hh2JEFeHsb6BHL0oLuaogdX",
    alt: "dubai skyline with futuristic skyscrapers and the burj khalifa during sunset",
  },
  {
    name: "London",
    count: 19,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIUf5Qy7HbypdtJJ9jzBQtJU_JSW6SNzDNdLzou-9PA71zwlkPgJh4OOfzejxk7NqT-OBKm0NV0j1i1yo-1imqdkjdVGzk1CyKBVsjEWf0WwENNsIoxWXDKLgKUO16q0IbIIzMlc3jSW-aH_6TQSkumAAao4MbR8Yi3qOVagObjEh-GIUVMbAFVuzhDOu0KYsBwnGKIfGz9_TVWkhoPmP5aP1hIfUsi5hLVqcrOLFdwzCHWdFYAKAjnD1bCQ5yj9vYsDySa4Rf7QFH",
    alt: "london street view with a red double decker bus crossing a bridge near big ben",
  },
];

export default function Home() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[870px] flex items-center px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-[0.4]"
            data-alt="ultra-modern luxury architectural villa with floor-to-ceiling glass windows at dusk with warm interior lighting reflecting on an infinity pool"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdq4thCRIs5Hm3HGIaXPt_8LtWr7V8y5_T6aTgsa0yHgZcc4AybgV5Kd-AmmdascmB16Vm5YBNvqgiFFTyJBWazqcc_p5bX9U1D3kriUYuclsVvxpfLyWbqw9qwQahUMfcec6rtfyrgSAnqys7I6yrHSorrzN-K2LrNyiLaS-JNWR48Lw2JTbhkZ662REzvvLd_TkWq3HjbOOVOwzmd9kv29qGy6s5Bpr9B2zEXTLD8VnaG3NnRJ3RTOLGBH_Jo7aDsaMYuyQvgZtm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="space-y-2">
            <span className="text-primary font-label text-sm uppercase tracking-[0.3em] font-bold">
              Curating Extraordinary Living
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight italic">
              The Fine Art of <br />
              <span className="text-gradient-gold">Residence.</span>
            </h1>
          </div>
          <div className="bg-surface-container-low/40 backdrop-blur-2xl p-2 rounded-xl max-w-3xl flex flex-col md:flex-row gap-2 shadow-2xl">
            <div className="flex-1 flex items-center px-4 py-3 bg-surface-container-lowest rounded-lg">
              <MapPin className="text-primary mr-3 w-6 h-6" />
              <input
                className="bg-transparent border-none focus:ring-0 text-on-surface w-full placeholder:text-on-surface-variant/40 outline-none"
                placeholder="Global Destinations"
                type="text"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-3 bg-surface-container-lowest rounded-lg">
              <Building className="text-primary mr-3 w-6 h-6" />
              <select className="bg-transparent border-none focus:ring-0 text-on-surface w-full outline-none">
                <option>Penthouse</option>
                <option>Coastal Villa</option>
                <option>Alpine Lodge</option>
              </select>
            </div>
            <button className="bg-gradient-gold text-on-primary px-10 py-4 rounded-lg font-bold flex items-center justify-center gap-2">
              EXPLORE <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section (The Editorial Stat) */}
      <section className="py-20 px-6 md:px-12 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <p className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-widest text-primary font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings Carousel Placeholder (Bento Style) */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                Curated <span className="italic font-light">Selections</span>
              </h2>
              <div className="h-1 w-24 bg-primary" />
            </div>
            <button className="group flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
              View Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[700px]">
            {/* Large Feature */}
            <div className="md:col-span-7 relative group overflow-hidden rounded-xl">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="massive modern minimalist mansion with glass walls overlooking a cliffside ocean view at sunset with warm gold tones"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOF5f4LfCshXovLRNilcztetsDQg2cOtVczRAw-ulP66UEMB0tf5W4KRp0_XMKinfyKGM7H_UPoOf35JipvC5go5LcLSfSWfyndJZDNrwp95s7brBPya_hB17eFMEOG_vvMcsq0rHVd5seHdzFMwlG3lF2DrT_nDj9WIlTcBuD2R4rat2XF_OfLaCCPh97YgB5zE6qUmi-_ltrZM7Gbh6yd2BGHlXFPkcxlLElIsB8mPYdpaOw0Yj_kFAJ5hQfXwGM0-L1QXKif9TU"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 space-y-4">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  New Listing
                </span>
                <h3 className="text-3xl font-bold tracking-tight">
                  The Obsidian Cliff, Ibiza
                </h3>
                <div className="flex items-center gap-6 text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4" /> 6 Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-4 h-4" /> 8 Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="w-4 h-4" /> 12,400 sqft
                  </span>
                </div>
                <p className="text-2xl font-black text-primary">$28,500,000</p>
              </div>
            </div>
            {/* Right Stack */}
            <div className="md:col-span-5 grid grid-rows-2 gap-8">
              {smallFeaturedListings.map((listing, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-xl"
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    data-alt={listing.alt}
                    src={listing.image}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-xs text-primary uppercase tracking-widest font-bold">
                      {listing.location}
                    </p>
                    <h4 className="text-xl font-bold">{listing.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations Grid */}
      <section className="py-32 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl h-[400px] md:h-auto">
            <img
              className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000"
              data-alt="tropical paradise beach with turquoise water and white sand under a clear blue sky"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKEq0iIjVzjGqcAPaH_TLSxJCjeuTl4O4N-eCxj3Zz7cK63sf5FccFeyq8xvlNNa91j3ewZQpPL_YZAKAvLnFnLx1b6aPbDmLtbF6NA7IJDjW6lyKAq8q6uZn95FVKjh8COrVeOIsAIIa0dp0kCemkLYJwrT2n6UbgterLkJqwGwR7zRSjuP5hHFzSNMmj4wl2glBe-vL2xK3GNwdeWV_rpB7GdvlkDHsHYh26aBPFSFlolstZxMLbjR67DPMVT-6kNIoZNhYkdWN_"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-5xl font-black tracking-tighter uppercase italic opacity-30">
                Coastal
              </h3>
            </div>
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-on-surface font-bold text-2xl">
                French Riviera
              </p>
              <p className="text-primary text-sm uppercase tracking-widest">
                42 Properties
              </p>
            </div>
          </div>
          {popularLocations.map((location, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl h-[300px]"
            >
              <img
                className="w-full h-full object-cover brightness-50"
                data-alt={location.alt}
                src={location.image}
              />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-on-surface font-bold text-xl">
                  {location.name}
                </p>
                <p className="text-primary text-xs uppercase tracking-widest">
                  {location.count} Properties
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-surface">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
            Ready to Find Your{" "}
            <span className="text-gradient-gold italic">Sanctuary?</span>
          </h2>
          <p className="text-on-surface-variant text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Our private advisors are ready to curate a bespoke selection of
            global estates tailored specifically to your unique vision of
            extraordinary living.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-gradient-gold text-on-primary px-12 py-5 rounded-lg font-bold text-lg tracking-tight shadow-xl shadow-primary/10 hover:scale-105 transition-transform border-none outline-none">
              Request Concierge
            </button>
            <button className="border border-outline/30 text-primary px-12 py-5 rounded-lg font-bold text-lg tracking-tight hover:bg-primary/5 transition-colors group flex justify-center items-center gap-2">
              Browse Listings{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
