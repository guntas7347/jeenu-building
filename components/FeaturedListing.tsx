import { getListings } from "@/lib/actions/listings";
import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";

// Helper function to format the price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(price);
};

const FeaturedListing = async () => {
  const { data } = await getListings(1, 4, true);

  return (
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
          {data.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={property.title}
                  src={property.images?.[0] || "/placeholder-image.jpg"} // Safely grab the first image
                />

                {/* Dynamic Badge - Falls back to status if badge is missing */}
                {(property.badge || property.status) && (
                  <div
                    className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider shadow-sm uppercase ${
                      property.badge === "Sample" // You can adjust this condition based on your real data
                        ? "bg-blue-600 text-white"
                        : "bg-white/90 backdrop-blur text-blue-700"
                    }`}
                  >
                    {property.badge || property.status}
                  </div>
                )}

                <button className="absolute top-4 right-4 bg-white/20 hover:bg-white backdrop-blur h-10 w-10 rounded-full flex items-center justify-center text-white hover:text-red-500 transition-all">
                  <Heart size={20} className="fill-current stroke-current" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
                    {property.title}
                  </h3>
                  <span className="text-blue-600 text-xl font-bold ml-4">
                    {formatPrice(property.price)}
                  </span>
                </div>
                <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-6">
                  <MapPin size={16} className="flex-shrink-0" />
                  <span className="line-clamp-1">
                    {property.city}, {property.state}
                  </span>
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
                      {/* @ts-ignore - Assuming Prisma typed JSON, you might need to handle this based on your schema setup */}
                      {property.measurements?.totalSize || "N/A"} msq
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
  );
};

export default FeaturedListing;
