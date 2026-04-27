import {
  Eye,
  Globe,
  Lock,
  Sparkles,
  CheckCircle,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react";

const pillars = [
  {
    title: "Radical Transparency",
    description:
      "Every acquisition is backed by a 240-point forensic audit. From subterranean structural integrity to localized climate projections, our clients receive the unfiltered truth.",
    icon: Eye,
    className:
      "md:col-span-8 bg-surface-container p-10 rounded-xl relative overflow-hidden group",
    backgroundIcon: Shield,
  },
  {
    title: "Global Reach",
    description:
      "Access to off-market holdings in Zurich, Tokyo, and New York.",
    icon: Globe,
    className:
      "md:col-span-4 bg-surface-container-high p-10 rounded-xl flex flex-col justify-between",
    action: "Explore Network",
  },
  {
    title: "Absolute Discretion",
    description:
      "We operate in the shadows so your privacy remains illuminated. Our protocols exceed institutional grade.",
    icon: Lock,
    className:
      "md:col-span-4 bg-surface-container-low p-10 rounded-xl border border-outline-variant/10",
  },
];

const standards = [
  {
    number: "01",
    title: "Immutable Verification",
    description:
      "Every property deed and inspection report is timestamped and stored on a private ledger, ensuring a zero-alteration policy for all historical data.",
  },
  {
    number: "02",
    title: "Concierge Liability",
    description:
      "We provide a 12-month post-purchase structural guarantee, acting as the primary liaison between new owners and construction audits.",
  },
  {
    number: "03",
    title: "Unbiased Valuation",
    description:
      "Our valuation models are driven by third-party AI aggregates, removing the emotional inflation common in high-end real estate.",
  },
];

const AboutPage = () => {
  return (
    <main className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="px-12 max-w-7xl mx-auto mb-32">
        <div className="flex flex-col md:flex-row items-end gap-12">
          <div className="w-full md:w-2/3">
            <span className="text-primary font-label text-sm uppercase tracking-[0.2em] mb-6 block font-bold">
              Our Legacy
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-on-surface tracking-tighter leading-none mb-8">
              The Nocturnal <br />{" "}
              <span className="text-primary italic">Curator.</span>
            </h1>
            <p className="text-on-surface-variant text-xl md:text-2xl max-w-2xl leading-relaxed">
              Redefining luxury through architectural silence and editorial
              precision. We don't just list estates; we curate lifestyles for
              those who find clarity in the midnight hours.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-start border-l border-outline-variant/20 pl-8 pb-4">
            <div className="mb-8">
              <div className="text-4xl font-bold text-on-surface tracking-tighter">
                12.4B
              </div>
              <div className="text-primary text-xs uppercase tracking-widest font-label mt-1 font-bold">
                Portfolio Value
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-on-surface tracking-tighter">
                14
              </div>
              <div className="text-primary text-xs uppercase tracking-widest font-label mt-1 font-bold">
                Global Hubs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Feature - Editorial Style */}
      <section className="mb-32 px-4 md:px-0">
        <div className="relative h-[716px] w-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            data-alt="Modern minimalist architectural villa with clean concrete lines at twilight with soft internal warm lighting reflecting on a dark pool"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqShrAZmIUo7D1UhPXzkmeARY4eX2P4FeVREukDsg7H97RS3ZmnhoKcTu0TZFaJk0yO82Vh6L3WvOfacc5iAtelF8lsq57Ikc_MPbQ5SquftYCJGYEc3n-rljdZ_ynrcqWRPgTwZdVCz_36Ygc0YG1cJnbNAgTSEyMtZakHB5brFaJEHBx3bycg6Pw7hByh1FpsGVH60PLqcYuk8nj0fKzHLCcizcT_BeXQzftffgt5H5cxwEt_qNrICQsUB19eXiohZTj_OHZEPkj"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12 max-w-xl">
            <div className="glass-panel p-8 rounded-xl border-l-4 border-primary">
              <p className="text-on-surface text-lg font-medium leading-snug">
                "Architecture should speak of its time and place, but yearn for
                timelessness. We curate only those spaces that achieve this rare
                equilibrium."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Bento Grid */}
      <section className="px-12 max-w-7xl mx-auto mb-32">
        <h2 className="text-4xl font-black text-on-surface tracking-tight mb-16">
          The Pillars of Trust
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Radical Transparency & Global Reach & Direct Discretion*/}
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const BackgroundIcon = pillar.backgroundIcon;
            return (
              <div key={index} className={pillar.className}>
                <div className="relative z-10">
                  <Icon className="text-primary w-10 h-10 mb-6" />
                  <h3 className="text-3xl font-bold text-on-surface mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                {BackgroundIcon && (
                  <div className="absolute -right-12 -bottom-12 opacity-5 scale-150 transition-transform group-hover:scale-125 duration-700">
                    <BackgroundIcon className="w-64 h-64 text-on-surface" />
                  </div>
                )}
                {pillar.action && (
                  <div className="relative z-10 mt-8 pt-8 border-t border-outline-variant/10">
                    <button className="text-primary font-bold inline-flex items-center gap-2 group">
                      {pillar.action}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Curated Quality */}
          <div className="md:col-span-8 bg-surface-container-highest p-10 rounded-xl flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <Sparkles className="text-primary w-10 h-10 mb-6" />
              <h3 className="text-3xl font-bold text-on-surface mb-4">
                Curation Over Volume
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                We reject 94% of properties presented to us. Only the
                exceptional survives our filter.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-48 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <img
                className="w-full h-full object-cover"
                data-alt="Detail shot of high-end interior marble and brass finishes in a luxury apartment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvkN7J4mPVRW4rJxwjb1HFjw-68mmXfkiKeWFeOrCJ_CsL2oqtaJ0InOeF_rl4Vw7r2sZ5WsaKROp688bg0DnRSmtt4-FLNX_ccoIREeQAgKMaQSvkUuQbUMRO_CkAf-WlB4YbNwJfV3XlxtLTGdEO4UnJtQ_AFQ-A0qub_ihy2WAvyq_ywDDQabLz-rOROo1mBfkUIyDQuncPwU4OC9yGy9EtAqZwnI6T3uYQGcePr7gEDHjYcUxkw_wceJP9EtVHTpPFR4v-VkPc"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Commitment */}
      <section className="bg-surface-container-lowest py-32 border-t border-outline-variant/10">
        <div className="px-12 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-on-surface mb-8 tracking-tight">
            The Luxe Standard
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto mb-16 rounded-full" />
          <div className="space-y-12 text-left">
            {standards.map((standard, index) => (
              <div key={index} className="flex gap-8 items-start group">
                <div className="text-primary font-black text-3xl opacity-40 group-hover:opacity-100 transition-opacity">
                  {standard.number}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-on-surface mb-2">
                    {standard.title}
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed text-lg">
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
