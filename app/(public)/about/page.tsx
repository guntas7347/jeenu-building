import {
  Eye,
  Globe,
  Lock,
  Sparkles,
  Shield,
  ArrowRight,
} from "lucide-react";

const pillars = [
  {
    title: "Radical Transparency",
    description:
      "Every acquisition is backed by a 240-point forensic audit. From subterranean structural integrity to localized climate projections, our clients receive the unfiltered truth.",
    icon: Eye,
    className:
      "md:col-span-8 liquid-glass-card p-8 sm:p-10 rounded-3xl relative overflow-hidden group",
    backgroundIcon: Shield,
  },
  {
    title: "National Reach",
    description:
      "Curated turnkey and dual-occupancy opportunities across New South Wales, Queensland, and South Australia.",
    icon: Globe,
    className:
      "md:col-span-4 liquid-glass-card p-8 sm:p-10 rounded-3xl flex flex-col justify-between",
    action: "Explore Network",
  },
  {
    title: "Fixed Price Integrity",
    description:
      "Zero hidden variations or site surcharge surprises. Contracts are transparent and locked in upfront.",
    icon: Lock,
    className:
      "md:col-span-4 liquid-glass-card p-8 sm:p-10 rounded-3xl",
  },
];

const standards = [
  {
    number: "01",
    title: "Immutable Quality Verification",
    description:
      "Every build milestone is quality-audited and photographed for your client portal, ensuring zero compromises on craftsmanship.",
  },
  {
    number: "02",
    title: "25-Year Structural Warranty",
    description:
      "We stand behind our engineering with a comprehensive 25-year structural warranty, giving you lifelong peace of mind.",
  },
  {
    number: "03",
    title: "Turnkey Inclusions Guarantee",
    description:
      "High architectural ceilings, stone island benchtops, full landscaping, and ducted climate control come standard.",
  },
];

const AboutPage = () => {
  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row items-end gap-12">
          <div className="w-full md:w-2/3">
            <span className="text-primary text-xs uppercase tracking-[0.2em] mb-4 block font-extrabold">
              Our Legacy & Mission
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
              Precision Engineering. <br />{" "}
              <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                Exceptional Homes.
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-2xl leading-relaxed">
              Redefining home building through architectural excellence, turnkey simplicity, and uncompromised structural integrity across Australia.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-start border-l border-slate-200 dark:border-slate-800 pl-8 pb-4">
            <div className="mb-6">
              <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                450+
              </div>
              <div className="text-primary text-xs uppercase tracking-widest mt-1 font-bold">
                Delivered Builds
              </div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                100%
              </div>
              <div className="text-primary text-xs uppercase tracking-widest mt-1 font-bold">
                Fixed-Price Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Bento Grid */}
      <section className="mb-24">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-12">
          The Pillars of Trust
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const BackgroundIcon = pillar.backgroundIcon;
            return (
              <div key={index} className={pillar.className}>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                {BackgroundIcon && (
                  <div className="absolute -right-8 -bottom-8 opacity-5 scale-150 transition-transform group-hover:scale-125 duration-700 pointer-events-none">
                    <BackgroundIcon className="w-64 h-64 text-slate-900 dark:text-white" />
                  </div>
                )}
                {pillar.action && (
                  <div className="relative z-10 mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10">
                    <button className="text-primary font-bold text-sm inline-flex items-center gap-2 group cursor-pointer">
                      {pillar.action}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Curated Quality */}
          <div className="md:col-span-8 liquid-glass-card p-8 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Curation Over Volume
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                We select only prime, high-growth blocks with verified soil condition, optimal orientation, and highest long-term appreciation potential.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-48 rounded-2xl overflow-hidden shadow-inner">
              <img
                className="w-full h-full object-cover"
                alt="Modern luxury home interior"
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Commitment */}
      <section className="liquid-glass-elevated rounded-3xl py-16 px-6 sm:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">
            The Red Owl Commitment
          </h2>
          <div className="space-y-8 text-left">
            {standards.map((standard, index) => (
              <div key={index} className="flex gap-6 items-start group">
                <div className="text-primary font-black text-2xl font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                  {standard.number}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                    {standard.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    {standard.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
