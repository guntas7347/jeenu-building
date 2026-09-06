import { getListings } from "@/lib/actions/listings";
import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/helpers";

const FeaturedListing = async () => {
  const { data } = await getListings(1, 6, true);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
        <div>
          <span className="text-primary font-bold text-xs mb-2 block uppercase tracking-widest">
            Handpicked Selection
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Red Owl's Top Picks
          </h2>
        </div>
        <Link
          href="/listings"
          className="px-6 py-2.5 rounded-full liquid-glass text-slate-800 dark:text-slate-200 hover:text-primary font-semibold text-xs transition-colors self-start md:self-auto border border-white/70 dark:border-white/10"
        >
          View All Listings
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((property) => (
          <Link
            key={property.id}
            href={`/listings/${property.slug}`}
            className="liquid-glass-card rounded-[2rem] overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden m-3 rounded-[1.6rem] bg-slate-100 dark:bg-slate-800">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  alt={property.title}
                  src={property.images?.[0] || "/placeholder-image.jpg"}
                />

                {/* Dynamic Badge */}
                {(property.badge || property.status) && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full liquid-glass-pill text-[10px] font-bold tracking-wider uppercase text-slate-900 dark:text-white">
                    {property.badge || property.status}
                  </div>
                )}

                <button
                  aria-label="Save property"
                  className="absolute top-3 right-3 w-9 h-9 liquid-glass-pill rounded-full flex items-center justify-center text-slate-700 dark:text-white hover:text-red-500 transition-all"
                >
                  <Heart size={16} />
                </button>
              </div>

              <div className="p-6 pt-2">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <span className="text-primary text-xl font-bold ml-4 shrink-0">
                    {formatPrice(property.price)}
                  </span>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1.5 mb-5 font-medium">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span className="truncate">
                    {property.city}, {property.state}
                  </span>
                </p>

                <div className="flex justify-between py-3 border-t border-slate-200/50 dark:border-white/5 text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Bed size={15} className="text-primary" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Bath size={15} className="text-primary" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Square size={15} className="text-primary" />
                    <span>
                      {/* @ts-ignore */}
                      {property.measurements?.totalSize || "N/A"} m²
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/listings"
          className="inline-flex items-center gap-2 px-8 py-3.5 liquid-glass-elevated text-slate-900 dark:text-white font-bold text-sm rounded-2xl hover:border-primary/40 transition-all shadow-sm"
        >
          Show More Properties
        </Link>
      </div>
    </section>
  );
};

export default FeaturedListing;
