import { MapPin, Home, Wine, CarFront, Waves } from "lucide-react";
import InquiryForm from "./InquiryForm";
import { Property } from "@/types";
import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/firebase/services";

type Params = Promise<{ slug: string }>;

export default async function PropertyDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const property = await getPropertyById(slug);

  if (!property) {
    notFound();
  }

  const stats = [
    { value: property.sqft || "N/A", label: "Living Sq Ft" },
    { value: property.beds.toString(), label: "Bedrooms" },
    { value: property.baths.toString(), label: "Bathrooms" },
    { value: property.status, label: "Status" },
  ];

  const amenities = [
    {
      title: "Private Cellar",
      description:
        "Climate-controlled vault for 1,200 bottles with sommelier tasting station.",
      icon: Wine,
    },
    {
      title: "10-Car Gallery",
      description:
        "Automotive showroom with turntable and integrated ventilation system.",
      icon: CarFront,
    },
    {
      title: "Wellness Wing",
      description:
        "Himalayan salt sauna, steam room, and high-performance gym area.",
      icon: Waves,
    },
  ];

  const mainImage =
    property.images && property.images.length > 0
      ? property.images[0]
      : "https://lh3.googleusercontent.com/aida-public/AB6AXuA9l2oslhUk-ez8dU24lfdkuSrrZTg67Gr9sImZboooopz2jLM4XTh520ZjiubNRXu8JKIM6E0r0GPZ_qZnHq9cI3g_knNoyFd6K5n0wULkKLYby6sT85QLPNAzLnwG52S_jFno8rte2wlJ6LPVFqj1DI1j1HQukLOGAucu4VXlsAWW1O1FCbIQwueyKfEQY88uM2sAz9oPEhUUTX5-9i1Weu3wR5reqlAp6gZD7T4QgU5NCwKt1bXUTXRTakrM13rH6n2FFmEhO8EC";

  const galleryImages = (property.images || []).slice(1, 3).map((src) => ({
    src,
    alt: property.title,
  }));

  // Fill empty galleries with fallbacks if needed
  if (galleryImages.length === 0) {
    galleryImages.push({
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-9bHIPw_0Utrao6iCaeoiHhSn2ya5-Owpc64F4TlrIwuPxO29rR-aoId75e3OHz92tGBn2y7dU6zLAzDn3tiOxC7VonM3DT_GF5VtR89IG8zZVAFMen8-995f1WkxbpN9ynlN1yUdqp2BW1FOPLfvgfB7m_lVn4JrQWEqG2snhOFehByn4Bu-n8jzXGoB60fwEFsS6R23UzhYs2fJuC28yAqxhLr64hDKytJfL829dFAn7xT-pOFEj0ldEY0-awjCgMESM5l6DuWC",
      alt: "Interior shot",
    });
    galleryImages.push({
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAklaS7kuCbet-HZEQkHCWfbKhkmAOZhINMaQJqPslDzLVAMOXOJJpYyJXpi3YPsemCJPI5DCsYNunkvHiGV3ngf5D9h_0JA3eT4JMfEepoGB4b_DnboSPQ6IT4N7uCoBE6xqRTImd2nChq_apIsOI6aOc9ET4qimHeF2yEOtmg7iQi-ob6EtjC1EH161x35eGQh8PrVehT4ZFt6I17GzHYfqO7PAnxaRpPmy8mqtLVR7Gpou9kRXWVzQN9-i4ip-Esi9VooNhJKbd0",
      alt: "Bedroom",
    });
  }

  return (
    <main className="pt-28 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto">
      {/* Editorial Header */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-primary font-label text-sm uppercase tracking-widest font-bold">
              EXCLUSIVE COLLECTION
            </span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface">
              {property.title}
            </h1>
            <p className="text-on-surface-variant text-lg font-light tracking-wide">
              {property.location}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <span className="text-primary font-label text-sm uppercase tracking-widest mb-1">
              Asking Price
            </span>
            <div className="text-4xl md:text-6xl font-headline font-bold text-on-surface">
              {property.price}
            </div>
          </div>
        </div>
      </header>

      {/* Asymmetric Image Gallery (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-20 h-[600px] md:h-[800px]">
        <div className="md:col-span-8 h-full rounded-xl overflow-hidden relative group cursor-pointer bg-surface-container">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt={property.title}
            src={mainImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        <div className="md:col-span-4 grid grid-rows-2 gap-4 h-full">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden relative group cursor-pointer bg-surface-container"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={img.alt}
                src={img.src}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left Content: Description & Features */}
        <div className="lg:col-span-8 space-y-20">
          {/* Editorial Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-outline/10">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl font-headline font-bold text-on-surface truncate">
                  {stat.value}
                </div>
                <div className="text-xs font-label uppercase tracking-widest text-primary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Description Text */}
          <section className="space-y-8">
            <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tight">
              Property Overview
            </h2>
            <div className="prose prose-invert max-w-none text-on-surface-variant leading-relaxed space-y-6">
              <p className="whitespace-pre-wrap">
                {property.description || "No description provided."}
              </p>
            </div>
          </section>

          {/* Features Bento Grid */}
          <section className="space-y-10">
            <h3 className="text-xl font-label uppercase tracking-widest text-primary font-bold">
              Refined Amenities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {amenities.map((amenity, idx) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={idx}
                    className="bg-surface-container-low p-8 rounded-xl space-y-4 hover:bg-surface-container transition-colors group"
                  >
                    <Icon className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-on-surface">
                      {amenity.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      {amenity.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Map Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-label uppercase tracking-widest text-primary font-bold">
                Location
              </h3>
              <span className="text-on-surface-variant text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-on-surface-variant" />
                {property.location}
              </span>
            </div>
            <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-surface-container-highest relative">
              <img
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                alt="Map View Placeholder"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo3EFajpjcnqfPP9_nl6TzbBvT7uCoIs-1_wJl0aJ0BFaBji6FYZPczBpMjX5lc0GZr4fQTvRGuevpMIXazwD7LsQNtVxyIIHv2TftjeJklSgnJJcBZiuRz2Pg5w6APc_GyM3G9KwdA1Ux2K7aTAQi1QPr6_ndPz_5t9dN8rfPHqYlmX3nRwSCYcjep0KH24pR3PBeaaEOoJqIoAlTVfLZOnrwWurIq-V565SpZJQy3G-JePaRuxVA-dWekjCMl8aujLukT5FhPip0"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-gradient-gold shadow-2xl flex items-center justify-center animate-pulse">
                  <Home className="text-on-primary w-6 h-6" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Inquiry Form */}
        <aside className="lg:col-span-4">
          <div className="sticky top-32 bg-surface-container p-8 rounded-2xl shadow-[0_32px_64px_rgba(60,71,90,0.08)] space-y-8 border-t border-white/5">
            <div className="space-y-2">
              <h3 className="text-2xl font-headline font-bold text-on-surface">
                Inquire Privately
              </h3>
              <p className="text-on-surface-variant text-sm">
                Our concierge will contact you within 24 hours to arrange a
                viewing.
              </p>
            </div>

            <InquiryForm
              propertyId={property.id}
              propertyTitle={property.title}
            />

            <div className="pt-6 border-t border-outline/10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Agent"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm6wete-d32wGdfV9M6E_IKL-ayBTj_-XrcCQykH2qdjkBuIKboQcfD0HHgZG11xyuD_zJNy5NXtONtNa60z_pa9Rexuu4l_tpVu8fOsc7QJn4yVyoX75cGuBjGFtYj2zHGuGpp7mmQZsW-Crqo2fq1w8k5DGlNAH64wiXjp7CaaxfL3ZfqttwnGu4w8uMPLyPpWFXKJcIrKNzlwf7xIn_uVQaqP9D8eAcPVmUq-YviFeRn_n5k36S6j2n7VuYai19fOoVJWz6h-e2"
                  />
                </div>
                <div>
                  <div className="font-bold text-on-surface">
                    Julian Vasseur
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    Director of Private Sales
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 border border-outline/30 py-3 rounded text-xs font-bold uppercase tracking-tighter hover:bg-on-surface/5 transition-colors text-on-surface cursor-pointer">
                  Call Office
                </button>
                <button className="flex-1 border border-outline/30 py-3 rounded text-xs font-bold uppercase tracking-tighter hover:bg-on-surface/5 transition-colors text-on-surface cursor-pointer">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
