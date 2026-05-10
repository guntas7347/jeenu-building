import HeroSection from "@/components/Hero";
import FeaturedListing from "@/components/FeaturedListing";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />

      {/* Categories Section */}
      {/* <section className="py-16 px-6 bg-slate-50">
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
      </section> */}

      <FeaturedListing />
      {/* Newsletter / CTA */}
      {/* <section className="py-20 px-6">
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
      </section> */}
    </main>
  );
}
