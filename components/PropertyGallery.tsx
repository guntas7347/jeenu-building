"use client";

import { useState, useEffect } from "react";
import { X, Grid3x3, Expand } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";

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

  useEffect(() => {
    document.body.style.overflow = gridOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gridOpen]);

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

          {/* MOBILE ONLY: Floating photos counter (Hidden on desktop) */}
          {allImages.length > 1 && (
            <button
              className="md:hidden absolute bottom-4 right-4 bg-black/60 backdrop-blur-md rounded-xl px-4 py-2 z-10 hover:bg-black/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setGridOpen(true);
              }}
            >
              <span className="text-white text-xs font-bold tracking-wider">
                1 / {allImages.length}
              </span>
            </button>
          )}
        </div>

        {/* Side images - HIDDEN ON MOBILE (hidden md:grid) */}
        <div className="hidden md:grid col-span-5 grid-rows-2 gap-2">
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

              {/* DESKTOP ONLY: "View all photos" overlay on last side image */}
              {i === 1 && allImages.length > 3 && (
                <button
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGridOpen(true);
                  }}
                >
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl px-5 py-3 transition-transform hover:scale-105">
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
      <ImageLightbox
        images={allImages}
        currentIndex={activeIdx}
        onIndexChange={setActiveIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={title}
      />

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
