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
  const hasMultiple = allImages.length > 1;
  const hasThreeOrMore = allImages.length >= 3;

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
      {/* Gallery Grid - Responsive Aspect Ratio for Rectangular Photos */}
      <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-white/10">
        {/* Scenario 1: Only 1 Image */}
        {!hasMultiple ? (
          <div
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2/1] md:max-h-[500px] cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(0)}
          >
            <img
              src={mainImage}
              alt={title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white/30 dark:bg-black/40 backdrop-blur-md rounded-full p-3.5 border border-white/40 shadow-lg">
                <Expand className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ) : !hasThreeOrMore ? (
          /* Scenario 2: Exactly 2 Images */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 aspect-[16/10] md:aspect-[16/9] md:max-h-[480px]">
            {allImages.slice(0, 2).map((src, i) => (
              <div
                key={i}
                className="relative cursor-pointer group overflow-hidden"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={src}
                  alt={`${title} - view ${i + 1}`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.015]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-white/30 dark:bg-black/40 backdrop-blur-md rounded-full p-3.5 border border-white/40 shadow-lg">
                    <Expand className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Scenario 3: 3 or More Images (8:4 Proportional Grid) */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 aspect-[16/10] md:aspect-[16/9] md:max-h-[500px]">
            {/* Main large image (Takes 8 cols out of 12 for natural 16:10 / 16:9 proportion) */}
            <div
              className="col-span-1 md:col-span-8 relative cursor-pointer group overflow-hidden h-full"
              onClick={() => openLightbox(0)}
            >
              <img
                src={mainImage}
                alt={title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/30 dark:bg-black/40 backdrop-blur-md rounded-full p-3.5 border border-white/40 shadow-lg">
                  <Expand className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* MOBILE ONLY: Floating photos counter */}
              <button
                className="md:hidden absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white rounded-xl px-3.5 py-1.5 z-10 text-xs font-bold tracking-wider"
                onClick={(e) => {
                  e.stopPropagation();
                  setGridOpen(true);
                }}
              >
                1 / {allImages.length} Photos
              </button>
            </div>

            {/* Side 2 stacked images (Takes 4 cols out of 12) */}
            <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-2 h-full">
              {sideImages.map((src, i) => (
                <div
                  key={i}
                  className="relative cursor-pointer group overflow-hidden h-full"
                  onClick={() => openLightbox(i + 1)}
                >
                  <img
                    src={src}
                    alt={`${title} - view ${i + 2}`}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />

                  {/* DESKTOP ONLY: "View all photos" overlay on last side image */}
                  {i === 1 && allImages.length > 3 && (
                    <button
                      className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 backdrop-blur-[2px] transition-all cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setGridOpen(true);
                      }}
                    >
                      <div className="bg-white/20 dark:bg-black/50 backdrop-blur-md border border-white/30 rounded-2xl px-5 py-2.5 shadow-lg flex items-center gap-2 text-white">
                        <Grid3x3 className="w-4 h-4" />
                        <span className="text-xs font-extrabold tracking-wider uppercase">
                          +{allImages.length - 3} Photos
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => setGridOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 hover:border-primary/50 hover:text-primary transition-all cursor-pointer"
        >
          <Grid3x3 className="w-4 h-4" />
          All Photos ({allImages.length})
        </button>
      </div>

      {/* Lightbox Modal */}
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
        <div className="fixed inset-0 z-[100] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-bold text-xl text-slate-900 dark:text-white">
              {allImages.length} Photos — {title}
            </h2>
            <button
              onClick={() => setGridOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Close photos grid"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {allImages.map((src, i) => (
              <div
                key={i}
                className="aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group relative bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-white/10"
                onClick={() => {
                  setGridOpen(false);
                  openLightbox(i);
                }}
              >
                <img
                  src={src}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
