"use client";

import React, { useState } from "react";
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";

interface FloorPlanGalleryProps {
  images: string[];
}

const FloorPlanGallery = ({ images }: FloorPlanGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-slate-900">Floor Plans</h4>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {activeIndex + 1} / {images.length}
          </span>
        </div>

        {/* Main Display Area */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="relative bg-slate-50 rounded-2xl p-2 md:p-4 flex items-center justify-center border border-slate-100 group cursor-zoom-in overflow-hidden aspect-square md:aspect-[4/3]"
        >
          <img
            alt={`Floor Plan ${activeIndex + 1}`}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            src={images[activeIndex]}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
            <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-sm">
              <Maximize2 className="text-slate-700" size={24} />
            </div>
          </div>

          {/* Navigation Arrows (Only if multiple) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 md:left-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-md border border-slate-200 transition-all opacity-100 md:opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft size={20} className="text-slate-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 md:right-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-md border border-slate-200 transition-all opacity-100 md:opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight size={20} className="text-slate-700" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails (Only if multiple) */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative shrink-0 w-20 h-16 rounded-lg border-2 transition-all overflow-hidden ${
                  activeIndex === idx
                    ? "border-blue-500 ring-2 ring-blue-500/10"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt="Thumbnail"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      <ImageLightbox
        images={images}
        currentIndex={activeIndex}
        onIndexChange={setActiveIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Floor Plan"
      />
    </>
  );
};

export default FloorPlanGallery;
