"use client";

import { useState } from "react";
import { Bath, Bed, Heart, MapPin, Square, Loader2, Car } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/helpers";
import { useAuthModal } from "@/lib/authModalContext";
import { saveListing, unSaveListing } from "@/lib/actions/user";

const ListingCard = ({
  property,
  totalSize,
  displayImage,
}: {
  property: any;
  totalSize: string;
  displayImage: string;
}) => {
  const [saved, setSaved] = useState<boolean>(!!property.saved);
  const [isNavigating, setIsNavigating] = useState(false);
  const { openLoginModal, session } = useAuthModal();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) return openLoginModal();
    if (saved) {
      unSaveListing(property.id);
      setSaved(false);
    } else {
      saveListing(property.id);
      setSaved(true);
    }
  };

  return (
    <Link
      href={`/listings/${property.slug}`}
      onClick={() => setIsNavigating(true)}
      className="group relative liquid-glass rounded-[2rem] overflow-hidden block hover:scale-[1.02] active:scale-[0.98] transition-all duration-500"
    >
      {/* Dynamic Glow: Becomes more subtle in dark mode */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(255,255,255,0.15)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(255,255,255,0.05)_0%,transparent_60%)]" />

      {/* Loading Overlay */}
      {isNavigating && (
        <div className="absolute inset-0 z-50 bg-white/20 dark:bg-black/40 backdrop-blur-md flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-secondary" />
        </div>
      )}

      {/* Image Container with Inset padding for "Float" effect */}
      <div className="relative aspect-[16/10] overflow-hidden m-3 rounded-[1.6rem] shadow-inner">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          alt={property.title}
          src={displayImage}
        />

        {/* Floating Glass Badge */}
        {property.badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/20 text-white dark:text-white/90 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg">
              {property.badge}
            </span>
          </div>
        )}

        <button
          onClick={handleSave}
          className="absolute top-3 right-3 w-10 h-10 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/40 transition-all active:scale-90"
        >
          <Heart
            size={18}
            className={saved ? "fill-red-500 text-red-500" : ""}
          />
        </button>
      </div>

      <div className="p-6 pt-2">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-0.5">
              Current List
            </p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {formatPrice(property.price)}
            </h4>
          </div>
          <div className="bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase">
            {property.status}
          </div>
        </div>

        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1 truncate">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm mb-6 font-medium">
          <MapPin size={14} className="text-secondary/70" />
          {property.city}, {property.state}
        </div>

        {/* Stats Section with Adaptive Dividers */}
        <div className="flex items-center justify-between border-t border-slate-200/50 dark:border-white/5 pt-5">
          <div className="flex gap-5 text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 group/icon">
              <Bed
                size={16}
                className="text-slate-400 dark:text-slate-500 group-hover/icon:text-secondary transition-colors"
              />
              <span className="text-sm font-bold">{property.beds}</span>
            </div>
            <div className="flex items-center gap-1.5 group/icon">
              <Bath
                size={16}
                className="text-slate-400 dark:text-slate-500 group-hover/icon:text-secondary transition-colors"
              />
              <span className="text-sm font-bold">{property.baths}</span>
            </div>
            <div className="flex items-center gap-1.5 group/icon">
              <Car
                size={16}
                className="text-slate-400 dark:text-slate-500 group-hover/icon:text-secondary transition-colors"
              />
              <span className="text-sm font-bold">{property.garages}</span>
            </div>
            <div className="flex items-center gap-1.5 group/icon">
              <Square
                size={16}
                className="text-slate-400 dark:text-slate-500 group-hover/icon:text-secondary transition-colors"
              />
              <span className="text-sm font-bold">{totalSize} m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
