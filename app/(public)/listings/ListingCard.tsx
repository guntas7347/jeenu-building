import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";
import Link from "next/link";

// Helper to format currency
const formatPrice = (paisaValue: bigint | number | string) => {
  if (paisaValue == null) return "$0";
  const value = Number(paisaValue) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const ListingCard = ({
  property,
  totalSize,
  displayImage,
}: {
  property: any;
  totalSize: string;
  displayImage: string;
}) => {
  return (
    <Link
      href={`/listings/${property.slug}`}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={property.title}
          src={displayImage}
        />

        {/* Render badge only if it exists in the data */}
        {property.badge && (
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              {property.badge}
            </span>
          </div>
        )}

        {/* Prevent default so clicking the heart doesn't trigger the Link navigation */}
        <button
          // onClick={(e) => e.preventDefault()}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm"
        >
          <Heart size={20} className="fill-current stroke-current" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-bold text-blue-700">
            {formatPrice(property.price)}
          </h4>
          <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase">
            {property.status}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4 truncate">
          <MapPin size={16} className="shrink-0" />
          {property.city}, {property.state}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Bed size={18} className="text-blue-600" />
              <span className="text-sm font-semibold">{property.beds}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Bath size={18} className="text-blue-600" />
              <span className="text-sm font-semibold">{property.baths}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Square size={18} className="text-blue-600" />
              <span className="text-sm font-semibold">{totalSize} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
