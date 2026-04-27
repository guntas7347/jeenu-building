"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Grid3x3, Expand } from "lucide-react";

export default function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [gridOpen, setGridOpen] = useState(false);

  const allImages = images?.length ? images : ["/api/placeholder/1200/800"];
  const mainImage = allImages[0];
  const sideImages = allImages.slice(1, 3);

  const openLightbox = (idx: number) => {
    setActiveIdx(idx);
    setLightboxOpen(true);
  };

  const next = useCallback(
    () => setActiveIdx((i) => (i + 1) % allImages.length),
    [allImages.length],
  );
  const prev = useCallback(
    () => setActiveIdx((i) => (i - 1 + allImages.length) % allImages.length),
    [allImages.length],
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, next, prev]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen || gridOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, gridOpen]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-12 gap-2 h-[340px] md:h-[480px] rounded-2xl overflow-hidden">
        {/* Main large image */}
        <div
          className="col-span-12 md:col-span-7 relative cursor-pointer group overflow-hidden"
          onClick={() => openLightbox(0)}
        >
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
              <Expand className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Side images */}
        <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-2">
          {(sideImages.length === 2
            ? sideImages
            : [
                sideImages[0] || "/api/placeholder/600/400",
                "/api/placeholder/600/400",
              ]
          ).map((src, i) => (
            <div
              key={i}
              className="relative cursor-pointer group overflow-hidden"
              onClick={() => openLightbox(i + 1)}
            >
              <img
                src={src}
                alt={`Property view ${i + 2}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {/* "View all photos" overlay on last side image */}
              {i === 1 && allImages.length > 3 && (
                <button
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGridOpen(true);
                  }}
                >
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl px-5 py-3">
                    <span className="text-white text-sm font-bold tracking-wider">
                      +{allImages.length - 3} Photos
                    </span>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => setGridOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline/20 rounded-full text-xs font-bold uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-all"
        >
          <Grid3x3 className="w-4 h-4" />
          All Photos ({allImages.length})
        </button>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors bg-white/10 rounded-full p-2"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-widest">
            {activeIdx + 1} / {allImages.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[80vh] w-full px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={activeIdx}
              src={allImages[activeIdx]}
              alt={`${title} - photo ${activeIdx + 1}`}
              className="max-w-full max-h-[80vh] object-contain mx-auto rounded-xl animate-[fadeIn_0.2s_ease]"
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-6 overflow-x-auto">
            {allImages.map((src, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx(i);
                }}
                className={`flex-shrink-0 w-14 h-10 rounded-md overflow-hidden border-2 transition-all ${i === activeIdx ? "border-primary" : "border-transparent opacity-50 hover:opacity-80"}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* All Photos Grid Modal */}
      {gridOpen && (
        <div className="fixed inset-0 z-[100] bg-background/98 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-outline/10">
            <h2 className="font-headline font-bold text-xl">
              {allImages.length} Photos — {title}
            </h2>
            <button
              onClick={() => setGridOpen(false)}
              className="p-2 rounded-full hover:bg-surface-container transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {allImages.map((src, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group relative"
                onClick={() => {
                  setGridOpen(false);
                  openLightbox(i);
                }}
              >
                <img
                  src={src}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
